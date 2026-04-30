import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Ensure exactly 2 users in a match
matchSchema.pre("save", function (next) {
  if (this.users.length !== 2) {
    next(new Error("A match must have exactly 2 users"));
  }
  next();
});

export default mongoose.model("Match", matchSchema);
