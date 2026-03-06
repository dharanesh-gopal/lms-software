const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Lesson = require('../models/Lesson');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 * 1024 } }); // 5GB limit

// POST /api/lessons - create lesson with video upload
router.post('/', authMiddleware, roleMiddleware('faculty', 'admin'), upload.single('video'), async (req, res) => {
  try {
    const { title, course, order, description, duration } = req.body;
    const videoUrl = req.file ? `/uploads/videos/${req.file.filename}` : null;

    const lesson = new Lesson({
      title,
      course,
      order: parseInt(order),
      description,
      videoUrl,
      videoTitle: title,
      duration: duration ? parseInt(duration) : 0
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/lessons/:id
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/lessons/:id
router.put('/:id', authMiddleware, roleMiddleware('faculty', 'admin'), upload.single('video'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.videoUrl = `/uploads/videos/${req.file.filename}`;
    }

    const lesson = await Lesson.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    res.json(lesson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/lessons/:id
router.delete('/:id', authMiddleware, roleMiddleware('faculty', 'admin'), async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
