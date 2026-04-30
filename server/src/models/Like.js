import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["liked", "skipped"],
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure unique combination of fromUserId and toUserId
likeSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
