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
