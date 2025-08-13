require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const Message = require('./models/Message'); // ✅ Add this

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// API routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Track online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Register user as online
  socket.on('user_connected', (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is online.`);
  });

  // Handle sending messages
  socket.on('sendMessage', async (msg) => {
    try {
      // Save message in DB
      const savedMsg = await Message.create(msg);

      // Emit to receiver if online
      const receiverSocket = onlineUsers.get(msg.receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit('receive_message', savedMsg);
      }

      // Emit to sender
      io.to(socket.id).emit('receive_message', savedMsg);

      console.log(`Message from ${msg.senderId} to ${msg.receiverId} sent.`);
    } catch (err) {
      console.error('Message save failed:', err);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    for (let [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected.`);
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
