const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validations");
const { ensureAuthenticated, ensureGuest } = require("../middleware/auth");

const router = express.Router();

// @route   POST /auth/register
// @desc    Register new user
// @access  Public
router.post("/register", ensureGuest, registerValidation, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({ email, password, name });

    // Auto login after registration
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Registration successful, please login" });
      }
      return res.status(201).json({
        message: "Registration successful",
        user: user.toJSON(),
      });
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// @route   POST /auth/login
// @desc    Login user
// @access  Public
router.post("/login", ensureGuest, loginValidation, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server error during login" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.json({
        message: "Login successful",
        user: user.toJSON(),
      });
    });
  })(req, res, next);
});

// @route   POST /auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", ensureAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed" });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out successfully" });
    });
  });
});

// @route   GET /auth/me
// @desc    Get current user
// @access  Private
router.get("/me", ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
