import express from "express";
import { likeUser, skipUser } from "../controllers/swipeController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/swipe/like/:toUserId
 * Like a developer
 */
router.post("/like/:toUserId", authMiddleware, likeUser);

/**
 * POST /api/swipe/skip/:toUserId
 * Skip a developer
 */
router.post("/skip/:toUserId", authMiddleware, skipUser);

export default router;
