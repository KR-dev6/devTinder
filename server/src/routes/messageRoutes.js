import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/messages/:userId
 * Get all messages between current user and another user
 */
router.get("/:userId", authMiddleware, getMessages);

/**
 * POST /api/messages
 * Send a message
 */
router.post("/", authMiddleware, sendMessage);

export default router;
