import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function (req, res) {
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
}
