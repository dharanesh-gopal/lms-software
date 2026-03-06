const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lessonsCompleted: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  videosWatched: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in seconds
  quizzesTaken: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  lastAccessed: { type: Date },
  progress: { type: Number, default: 0 }, // percentage
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
