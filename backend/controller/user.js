import { Router } from "express";
import dotenv from "dotenv";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
dotenv.config();
const router = Router();
let tokenBlacklist = new Set();

// register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contactNumber, isAdmin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      contactNumber,
      isAdmin,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.APP_KEY, {
      expiresIn: "1h",
    });

    // Return response with token
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
// login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, reason: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, reason: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.APP_KEY, {
      expiresIn: "1h",
    });

    // Return response with token
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
// logout a user
router.post("/logout", async (req, res) => {
  if (req.headers["x-authorization"]) {
    tokenBlacklist.add(req.headers["x-authorization"]);
    res.send({ message: "Logout Successfull" });
  } else {
    res.send({ message: "No Auth Headers Provided" });
  }
});
// get all users
router.get("/", admin, async (req, res) => {
  let users = await User.find();
  res.json(users);
});
// get single user by id
router.get("/:id", auth, async (req, res) => {
  let user = await User.findOne({
    _id: req.params.id,
  });
  if (user) {
    res.json(user);
  } else {
    res.json({ success: false, reason: "User Not Found" });
  }
});
// find a user by id and update
router.patch("/:id", auth, async (req, res) => {
  let user = await User.find(req.params.id);
  user = req.body;
  user.save();
  res.json(user);
});
// delete a user
router.delete("/:email", auth, async (req, res) => {
  let user = await User.findOneAndDelete(req.params);
  if (user) {
    res.json({ message: `User ${user.email} deleted Successfully` });
  } else {
    res.json({ message: "Failed to Delete User" });
  }
});

export { tokenBlacklist, router };
