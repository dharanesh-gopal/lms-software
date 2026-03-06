const express = require('express');
const router = express.Router();
const Standard = require('../models/Standard');
const Subject = require('../models/Subject');

// GET /api/standards - list all standards
router.get('/', async (req, res) => {
  try {
    const standards = await Standard.find().populate('subjects');
    res.json(standards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/standards/:standard - get specific standard
router.get('/:standard', async (req, res) => {
  try {
    const standard = await Standard.findOne({ standard: req.params.standard })
      .populate('subjects');
    if (!standard) return res.status(404).json({ error: 'Standard not found' });
    res.json(standard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/standards/:standard/subjects
router.get('/:standard/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({ standard: req.params.standard });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
