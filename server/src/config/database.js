import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✓ MongoDB connection established successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    console.log("⚠ Server will continue running without database. API calls will fail.");
  }
};

export default connectDB;
