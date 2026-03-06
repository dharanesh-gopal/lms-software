const mongoose = require('mongoose');

const StandardSchema = new mongoose.Schema({
  standard: { type: String, required: true, unique: true }, // 11, 12
  name: { type: String, required: true }, // 11th Grade, 12th Grade
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Standard', StandardSchema);
