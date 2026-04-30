import express from "express";
import { getMatches, checkMatch } from "../controllers/matchController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/match
 * Get all matches for current user
 */
router.get("/", authMiddleware, getMatches);

/**
 * GET /api/match/:userId
 * Check if two users are matched
 */
router.get("/:userId", authMiddleware, checkMatch);

export default router;
