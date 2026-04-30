import User from "../models/User.js";
import Like from "../models/Like.js";

/**
 * Get user profile by ID
 * GET /api/users/profile/:id
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        skills: user.skills,
        github: user.github,
        location: user.location,
        portfolio: user.portfolio,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get current logged-in user profile
 * GET /api/users/me
 */
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { bio, skills, github, location, portfolio, profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        bio,
        skills,
        github,
        location,
        portfolio,
        profilePic,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get all users (for feed/swipe)
 * Exclude current user and users already interacted with
 * GET /api/users/feed
 */
export const getUsersFeed = async (req, res) => {
  try {
    // Find all users this person has already interacted with
    const interactions = await Like.find({ fromUserId: req.user.id }).select(
      "toUserId"
    );
    const interactedUserIds = interactions.map((interaction) =>
      interaction.toUserId.toString()
    );

    // Get users excluding current user and interacted users
    const users = await User.find({
      _id: { $nin: [req.user.id, ...interactedUserIds] },
    }).select("-password");

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getUserProfile, getMyProfile, updateProfile, getUsersFeed };
