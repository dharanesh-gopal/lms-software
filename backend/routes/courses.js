const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// GET /api/courses - list all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('faculty', 'name email')
      .sort('-createdAt');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/courses - faculty creates course
router.post('/', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const { title, description, subject, standard } = req.body;

    if (!title || !subject || !standard) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const course = new Course({
      title,
      description,
      subject,
      standard,
      faculty: req.user.id
    });
    await course.save();
    
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/courses/:id - get course details with lessons
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('faculty', 'name email')
      .populate('students', 'name email');
    if (!course) return res.status(404).json({ error: 'Not found' });

    const lessons = await Lesson.find({ course: req.params.id }).sort('order');
    res.json({ ...course.toObject(), lessons });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/courses/:id - faculty updates course
router.put('/:id', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/courses/:id
router.delete('/:id', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/courses/:id/enroll - student enrolls in course
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (!course.students.includes(req.user.id)) {
      course.students.push(req.user.id);
      await course.save();
    }
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
