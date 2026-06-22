import User from "../models/User.js"
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hash,
    });

    // 🔥 TOKEN ADD
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (!userExists)
      return res.status(404).json({ message: "Wrong credentials" });

    const isMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );

    if (!isMatch)
      return res.status(404).json({ message: "Wrong credentials" });

    // 🔥 TOKEN ADD
    const token = jwt.sign(
      { id: userExists._id, role: userExists.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: userExists,
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};