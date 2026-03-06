const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin', 'school-admin'], default: 'student' },
  school: { type: String },
  standard: { type: String }, // 11, 12 for students
  classTeaching: { type: String }, // 11, 12 for faculty
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // subjects they teach/study
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }, // kept for backward compatibility
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
