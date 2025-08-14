const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all users except logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } })
      .select('_id name email');
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
