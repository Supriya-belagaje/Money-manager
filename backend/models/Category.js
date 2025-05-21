// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
