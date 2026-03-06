const mongoose = require('mongoose');

const QuizAttemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: String,
    isCorrect: Boolean,
    points: Number
  }],
  score: { type: Number },
  totalPoints: { type: Number },
  percentage: { type: Number },
  passed: { type: Boolean },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  duration: { type: Number } // in seconds
});

module.exports = mongoose.model('QuizAttempt', QuizAttemptSchema);
