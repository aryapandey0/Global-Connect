const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

// Get all messages between two users
router.get('/:user1/:user2', auth, async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  }).sort({ createdAt: 1 });
  res.json(messages);
});

// Send new message
router.post('/', auth, async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const newMsg = await Message.create({ senderId, receiverId, content });
    res.json(newMsg);
  } catch (err) {
    res.status(500).json({ message: 'Send failed' });
  }
});

module.exports = router;
