const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  standard: { type: String, required: true }, // 11, 12
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  school: { type: String },
  thumbnail: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  totalLessons: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
