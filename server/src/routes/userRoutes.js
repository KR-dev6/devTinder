import express from "express";
import {
  getUserProfile,
  getMyProfile,
  updateProfile,
  getUsersFeed,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * GET /api/users/me
 * Get current logged-in user profile
 */
router.get("/me", authMiddleware, getMyProfile);

/**
 * GET /api/users/feed
 * Get all users for swipe feed (excluding current user and interacted users)
 */
router.get("/feed", authMiddleware, getUsersFeed);

/**
 * GET /api/users/:id
 * Get specific user profile
 */
router.get("/:id", getUserProfile);

/**
 * PUT /api/users/profile
 * Update current user profile
 */
router.put("/profile", authMiddleware, updateProfile);

export default router;
