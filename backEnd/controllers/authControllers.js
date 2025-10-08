// Start coding here

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// @desc Register new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
    // Log the request body for debugging
    console.log("Register request body:", req.body);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Error in registration", error: error.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in login", error: error.message });
  }
};

// @desc Get current user
// @route GET /api/auth/me
// @access Private
export const getMe = (req, res) => {
  res.json(req.user);
};

// @desc Admin only route
// @route GET /api/auth/admin
// @access Private/Admin
export const getAdmin = (req, res) => {
  res.json({ message: "Welcome Admin!" });
};
