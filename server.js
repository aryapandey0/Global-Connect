// server.js
// Express app, Mongo connection, routes, CORS, dotenv
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");


dotenv.config();
const { initSocket } = require("./socket");

const { initSocket } = require("./socket");

dotenv.config(); // Load .env first


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const connectionRoute = require("./routes/connectionRoute");

app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/connection", connectionRoute);

// Base route
app.get("/", (req, res) => res.send("Global Connect API running"));


// Create HTTP server for sockets
const server = http.createServer(app);

// MongoDB connect + start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    // Init socket after DB is connected
    initSocket(server);

    server.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  });

// Create HTTP server
const server = http.createServer(app);

// MongoDB connect + start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  initSocket(server); // Initialize socket after DB connection
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error("❌ MongoDB connection failed", err);
  process.exit(1);
});

