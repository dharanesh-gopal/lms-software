const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const QuizAttempt = require('../models/QuizAttempt');
const Course = require('../models/Course');
const User = require('../models/User');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// GET /api/analytics/dashboard/student - student dashboard stats
router.get('/dashboard/student', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get courses enrolled
    const enrolledCourses = await Course.find({ students: userId });
    
    // Get analytics for each course
    const analytics = await Analytics.find({
      user: userId,
      course: { $in: enrolledCourses.map(c => c._id) }
    });

    // Get quiz performance
    const quizAttempts = await QuizAttempt.find({ student: userId });
    const avgScore = quizAttempts.length > 0 
      ? (quizAttempts.reduce((sum, q) => sum + q.percentage, 0) / quizAttempts.length).toFixed(2)
      : 0;

    res.json({
      coursesEnrolled: enrolledCourses.length,
      totalLessonsWatched: analytics.reduce((sum, a) => sum + a.videosWatched, 0),
      averageQuizScore: parseFloat(avgScore),
      quizzesTaken: quizAttempts.length,
      totalTimeSpent: analytics.reduce((sum, a) => sum + a.timeSpent, 0),
      courseProgress: analytics.map(a => ({
        course: a.course,
        progress: a.progress,
        lessonsCompleted: a.lessonsCompleted,
        totalLessons: a.totalLessons
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics/dashboard/faculty - faculty dashboard stats
router.get('/dashboard/faculty', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const facultyId = req.user.id;
    
    // Get courses taught
    const courses = await Course.find({ faculty: facultyId });
    const courseIds = courses.map(c => c._id);

    // Get total students
    const totalStudents = await Course.aggregate([
      { $match: { faculty: facultyId } },
      { $unwind: '$students' },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);

    // Get quiz statistics
    const quizStats = await QuizAttempt.aggregate([
      { $match: { course: { $in: courseIds } } },
      { $group: {
        _id: null,
        totalQuizzes: { $sum: 1 },
        avgScore: { $avg: '$percentage' },
        passedCount: { $sum: { $cond: ['$passed', 1, 0] } }
      }}
    ]);

    res.json({
      coursesTaught: courses.length,
      totalStudents: totalStudents[0]?.count || 0,
      courseSummary: courses.map(c => ({ id: c._id, title: c.title, students: c.students.length })),
      quizStats: quizStats[0] || { totalQuizzes: 0, avgScore: 0, passedCount: 0 }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/analytics/dashboard/admin - admin dashboard stats
router.get('/dashboard/admin', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });

    const userStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalCourses,
      totalStudents,
      totalFaculty,
      usersByRole: userStats
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/analytics/track - track user activity
router.post('/track', authMiddleware, async (req, res) => {
  try {
    const { course, action, duration } = req.body;
    
    let analytics = await Analytics.findOne({ user: req.user.id, course });
    if (!analytics) {
      analytics = new Analytics({ user: req.user.id, course });
    }

    if (action === 'video-watched') analytics.videosWatched++;
    if (action === 'lesson-completed') analytics.lessonsCompleted++;
    if (action === 'quiz-taken') analytics.quizzesTaken++;
    if (duration) analytics.timeSpent += duration;

    analytics.lastAccessed = new Date();
    await analytics.save();

    res.json(analytics);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
