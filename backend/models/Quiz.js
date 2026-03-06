const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  questions: [{
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    type: { type: String, enum: ['multiple-choice', 'short-answer', 'true-false'] },
    options: [String], // for multiple-choice
    correctAnswer: String,
    points: { type: Number, default: 1 }
  }],
  totalPoints: { type: Number, default: 0 },
  timeLimit: { type: Number }, // in seconds
  passingScore: { type: Number, default: 60 }, // percentage
  allowRetake: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);
