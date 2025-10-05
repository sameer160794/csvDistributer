import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Register admin
export const registerAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create user with role "admin"
    const user = await User.create({ email, password, role: "admin" });

    // Respond with token and user info including role
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Respond with token and user info including role
    res.json({
      token: generateToken(user._id),
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};
