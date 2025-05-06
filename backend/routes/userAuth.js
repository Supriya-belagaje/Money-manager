const express = require("express");
const Router = express.Router();
const protect = require("../middlewares/authMiddleware");

Router.get("/me", protect, async (req, res) => {
    const { name, email } = req.user;
    res.json({ name, email });
});
module.exports = Router;
