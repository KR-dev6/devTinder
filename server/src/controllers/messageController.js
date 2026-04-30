import Message from "../models/Message.js";

/**
 * Get all messages between two users
 * GET /api/messages/:userId
 */
export const getMessages = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;

    // Find all messages between two users
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    })
      .populate("senderId", "name profilePic")
      .populate("receiverId", "name profilePic")
      .sort({ createdAt: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Send a message
 * POST /api/messages
 */
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({
        error: "Please provide receiver ID and message",
      });
    }

    if (!message.trim()) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    // Create message
    const newMessage = new Message({
      senderId,
      receiverId,
      message: message.trim(),
    });

    await newMessage.save();

    // Populate sender and receiver info
    await newMessage.populate("senderId", "name profilePic");
    await newMessage.populate("receiverId", "name profilePic");

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getMessages, sendMessage };
