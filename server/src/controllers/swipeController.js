import Like from "../models/Like.js";
import Match from "../models/Match.js";

/**
 * Like a developer
 * POST /api/swipe/like/:toUserId
 */
export const likeUser = async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const { toUserId } = req.params;

    if (fromUserId === toUserId) {
      return res.status(400).json({ error: "Cannot like yourself" });
    }

    // Check if already interacted
    const existingLike = await Like.findOne({ fromUserId, toUserId });
    if (existingLike) {
      return res.status(400).json({ error: "You already interacted with this user" });
    }

    // Create like
    const like = new Like({
      fromUserId,
      toUserId,
      status: "liked",
    });
    await like.save();

    // Check if it's a mutual like (match)
    const reverseInteraction = await Like.findOne({
      fromUserId: toUserId,
      toUserId: fromUserId,
      status: "liked",
    });

    if (reverseInteraction) {
      // Create a match
      const match = new Match({
        users: [fromUserId, toUserId],
      });
      await match.save();
      return res.status(201).json({
        message: "It's a match!",
        match: match,
      });
    }

    return res.status(201).json({
      message: "User liked successfully",
      like,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Skip a developer
 * POST /api/swipe/skip/:toUserId
 */
export const skipUser = async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const { toUserId } = req.params;

    if (fromUserId === toUserId) {
      return res.status(400).json({ error: "Cannot skip yourself" });
    }

    // Check if already interacted
    const existingSkip = await Like.findOne({ fromUserId, toUserId });
    if (existingSkip) {
      return res.status(400).json({ error: "You already interacted with this user" });
    }

    // Create skip
    const skip = new Like({
      fromUserId,
      toUserId,
      status: "skipped",
    });
    await skip.save();

    return res.status(201).json({
      message: "User skipped successfully",
      skip,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { likeUser, skipUser };
