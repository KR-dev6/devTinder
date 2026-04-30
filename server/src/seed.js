import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/database.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});
    console.log("✓ Cleared existing users");

    // Sample developers data
    const developers = [
      {
        name: "Kanak Rawat",
        email: "kanak@devtinder.com",
        password: "password123",
        bio: "Full-stack developer passionate about building scalable applications",
        skills: ["React", "Node.js", "MongoDB", "JavaScript"],
        github: "https://github.com/kanakrawat",
        location: "Delhi, India",
        portfolio: "https://kanakrawat.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=1&u=kanak@devtinder.com",
      },
      {
        name: "Sarah Johnson",
        email: "sarah@devtinder.com",
        password: "password123",
        bio: "Frontend developer with love for beautiful UX/UI",
        skills: ["React", "Tailwind CSS", "TypeScript", "Figma"],
        github: "https://github.com/sarahjohnson",
        location: "San Francisco, USA",
        portfolio: "https://sarahjohnson.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=5&u=sarah@devtinder.com",
      },
      {
        name: "Alex Chen",
        email: "alex@devtinder.com",
        password: "password123",
        bio: "Backend engineer specializing in microservices architecture",
        skills: ["Node.js", "Python", "Docker", "Kubernetes"],
        github: "https://github.com/alexchen",
        location: "Singapore",
        portfolio: "https://alexchen.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=3&u=alex@devtinder.com",
      },
      {
        name: "Emma Wilson",
        email: "emma@devtinder.com",
        password: "password123",
        bio: "DevOps engineer & cloud architect enthusiast",
        skills: ["AWS", "Docker", "CI/CD", "Linux"],
        github: "https://github.com/emmawilson",
        location: "London, UK",
        portfolio: "https://emmawilson.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=47&u=emma@devtinder.com",
      },
      {
        name: "Marcus Lee",
        email: "marcus@devtinder.com",
        password: "password123",
        bio: "AI/ML engineer building intelligent applications",
        skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
        github: "https://github.com/marcuslee",
        location: "Toronto, Canada",
        portfolio: "https://marcuslee.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=12&u=marcus@devtinder.com",
      },
      {
        name: "Lisa Anderson",
        email: "lisa@devtinder.com",
        password: "password123",
        bio: "Mobile app developer with 5+ years experience",
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        github: "https://github.com/lisaanderson",
        location: "Austin, USA",
        portfolio: "https://lisaanderson.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=9&u=lisa@devtinder.com",
      },
      {
        name: "David Brown",
        email: "david@devtinder.com",
        password: "password123",
        bio: "Web3 developer building decentralized apps",
        skills: ["Solidity", "Web3.js", "Smart Contracts", "Blockchain"],
        github: "https://github.com/davidbrown",
        location: "Amsterdam, Netherlands",
        portfolio: "https://davidbrown.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=2&u=david@devtinder.com",
      },
      {
        name: "Nina Patel",
        email: "nina@devtinder.com",
        password: "password123",
        bio: "Full-stack developer & tech writer",
        skills: ["JavaScript", "React", "Node.js", "GraphQL"],
        github: "https://github.com/ninapatel",
        location: "Bangalore, India",
        portfolio: "https://ninapatel.dev",
        profilePic:
          "https://i.pravatar.cc/150?img=26&u=nina@devtinder.com",
      },
    ];

    // Hash passwords and create users
    for (let dev of developers) {
      dev.password = await bcryptjs.hash(dev.password, 10);
    }

    const createdUsers = await User.insertMany(developers);
    console.log(`✓ Created ${createdUsers.length} sample users`);

    console.log("\n✓ Database seeded successfully!");
    console.log("\nSample credentials for testing:");
    console.log("Email: kanak@devtinder.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
