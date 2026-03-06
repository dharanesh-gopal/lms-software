const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'student', standard, classTeaching, subject, subjects } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate standard/class
    if (role === 'student' && !standard) {
      return res.status(400).json({ error: 'Student must select a standard' });
    }
    if (role === 'faculty' && !classTeaching) {
      return res.status(400).json({ error: 'Faculty must select a class/standard' });
    }

    // Validate subjects
    const subjectsArray = subjects && Array.isArray(subjects) ? subjects : (subject ? [subject] : []);
    if (subjectsArray.length === 0) {
      return res.status(400).json({ error: 'Must select at least one subject' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role,
      standard: role === 'student' ? standard : undefined,
      classTeaching: role === 'faculty' ? classTeaching : undefined,
      subjects: subjectsArray,
      subject: subjectsArray[0] || undefined
    });
    await user.save();

    // Populate subjects for response
    await user.populate('subjects');

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, standard: user.standard },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        standard: user.standard,
        classTeaching: user.classTeaching,
        subjects: user.subjects
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const user = await User.findOne({ email }).populate('subject').populate('subjects');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        standard: user.standard,
        classTeaching: user.classTeaching
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        standard: user.standard,
        classTeaching: user.classTeaching,
        subjects: user.subjects || []
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
