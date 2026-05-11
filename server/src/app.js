import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swipeRoutes from "./routes/swipeRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// Get __dirname equivalent for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from repo root first, then server/ — later call only fills gaps (no override).
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Initialize Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-git-main-kr-dev6s-projects.vercel.app",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dev-tinder-git-main-kr-dev6s-projects.vercel.app",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);

// Serve static files from the built frontend
app.use(express.static(path.join(__dirname, "../../client/dist")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/swipe", swipeRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/messages", messageRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// Socket.io for real-time chat
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("✓ New user connected:", socket.id);

  // User joins chat
  socket.on("user_connected", (userId) => {
    activeUsers.set(userId, socket.id);
    console.log(
      `✓ User ${userId} connected. Active users: ${activeUsers.size}`,
    );
  });

  // Send message
  socket.on("send_message", (data) => {
    const { senderId, receiverId, message, timestamp } = data;
    const receiverSocketId = activeUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", {
        senderId,
        message,
        timestamp,
      });
    }
  });

  // Typing indicator
  socket.on("user_typing", (data) => {
    const { receiverId } = data;
    const receiverSocketId = activeUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_typing", {
        typing: true,
      });
    }
  });

  socket.on("stop_typing", (data) => {
    const { receiverId } = data;
    const receiverSocketId = activeUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_typing", {
        typing: false,
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    // Remove user from active users
    for (let [userId, socketId] of activeUsers.entries()) {
      if (socketId === socket.id) {
        activeUsers.delete(userId);
        console.log(
          `✗ User ${userId} disconnected. Active users: ${activeUsers.size}`,
        );
        break;
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Serve index.html for all non-API routes (SPA fallback)
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "Route not found" });
  }
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
  console.log(`✓ WebSocket is ready for real-time communication`);
});

export default app;
