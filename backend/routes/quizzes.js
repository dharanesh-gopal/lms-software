const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// POST /api/quizzes - faculty creates quiz
router.post('/', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const { title, course, lesson, questions, totalPoints, timeLimit, passingScore } = req.body;
    const quiz = new Quiz({
      title,
      course,
      lesson,
      questions,
      totalPoints,
      timeLimit,
      passingScore
    });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/quizzes/my/attempts - student views their attempts
router.get('/my/attempts', authMiddleware, async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user.id })
      .populate('quiz', 'title totalPoints passingScore')
      .sort('-completedAt');
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/quizzes/:id - student view (hides answers)
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer');
    if (!quiz) return res.status(404).json({ error: 'Not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/quizzes/:id/admin - faculty view (with answers)
router.get('/:id/admin', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Not found' });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/quizzes/:id/submit - student submits quiz
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const { answers, course } = req.body;
    let score = 0;
    const evaluatedAnswers = [];

    // Grade quiz
    answers.forEach(answer => {
      const question = quiz.questions.id(answer.questionId);
      if (question) {
        const isCorrect = answer.answer === question.correctAnswer;
        const points = isCorrect ? question.points : 0;
        score += points;
        evaluatedAnswers.push({
          questionId: answer.questionId,
          answer: answer.answer,
          isCorrect,
          points
        });
      }
    });

    const percentage = (score / quiz.totalPoints) * 100;
    const passed = percentage >= quiz.passingScore;

    const attempt = new QuizAttempt({
      quiz: req.params.id,
      student: req.user.id,
      course,
      answers: evaluatedAnswers,
      score,
      totalPoints: quiz.totalPoints,
      percentage: Math.round(percentage),
      passed,
      completedAt: new Date()
    });

    await attempt.save();

    // Gamification XP for quiz
    let xpGained = passed ? 100 : 20; // 100 XP for passing, 20 XP for just taking it
    const User = require('../models/User'); // ensure User model is loaded
    const user = await User.findById(req.user.id);
    if (user) {
      if (percentage === 100) {
        xpGained += 50; // extra 50 for perfect score
        
        // check if has perfect score badge for this quiz
        const hasPerfectBadge = user.badges.some(b => b.name === 'Perfect Score');
        if (!hasPerfectBadge) {
          user.badges.push({ name: 'Perfect Score', icon: 'star', description: 'Got 100% on a quiz!' });
        }
      }

      user.xp = (user.xp || 0) + xpGained;
      const newLevel = Math.floor(user.xp / 100) + 1;
      if (newLevel > (user.level || 1)) {
        user.level = newLevel;
        user.badges.push({ name: `Level ${newLevel} Scholar`, icon: 'award', description: `Reached Level ${newLevel}` });
      }
      await user.save();
    }

    res.status(201).json(attempt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/quizzes/:id/attempts - faculty views student attempts
router.get('/:id/attempts', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ quiz: req.params.id })
      .populate('student', 'name email');
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
