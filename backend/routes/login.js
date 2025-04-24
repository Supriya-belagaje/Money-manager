const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const loginValidation = require('../validation/login');
const generateToken = require('../utils/generateToken');
require("dotenv").config();


Router.post('/login', async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    // ✅ Only ONE response — with everything
    return res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});

module.exports = Router;
