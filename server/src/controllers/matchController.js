import Match from "../models/Match.js";

/**
 * Get all matches for current user
 * GET /api/match
 */
export const getMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all matches where current user is part of
    const matches = await Match.find({
      users: userId,
    })
      .populate("users", "name email profilePic bio")
      .sort({ createdAt: -1 });

    // Filter out current user from each match
    const formattedMatches = matches.map((match) => ({
      matchId: match._id,
      user: match.users.find((u) => u._id.toString() !== userId),
      createdAt: match.createdAt,
    }));

    return res.status(200).json({ matches: formattedMatches });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Check if two users are matched
 * GET /api/match/:userId
 */
export const checkMatch = async (req, res) => {
  try {
    const userId1 = req.user.id;
    const { userId } = req.params;

    const match = await Match.findOne({
      users: { $all: [userId1, userId] },
    });

    return res.status(200).json({ isMatched: !!match });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getMatches, checkMatch };
