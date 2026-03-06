const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  order: { type: Number, required: true },
  description: { type: String },
  videoUrl: { type: String },
  videoTitle: { type: String },
  duration: { type: Number }, // in seconds
  resources: [{ type: String }], // file URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', LessonSchema);
