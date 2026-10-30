const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// User / Admin Registration
router.post("/Signup", async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ msg: "All fields are required", status: "false" });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already register", status: "false" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      userType: userType || "Ordinary",
    });

    res.status(200).json({
      msg: "User registered successfully",
      status: "true",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

// User / Admin Login
router.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required", status: "false" });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password", status: "false" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password", status: "false" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_SECRET || "hotelpro_super_secret_jwt_key_2026",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      msg: "Login successful",
      status: "true",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

// Get all users (Admin)
router.get("/getallusers", async (req, res) => {
  try {
    const users = await userModel.find({}, "-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
});

module.exports = router;
