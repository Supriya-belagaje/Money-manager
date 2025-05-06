// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//   amount: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ["income", "expense"],
//     required: true,
//   },
//   note: {
//     type: String,
//     default: "",
//   },
//   time: {
//     type: String, // You can store time as "hh:mm AM/PM"
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// module.exports = mongoose.model("Transaction", transactionSchema);

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  note: {
    type: String,
    default: "",
  },
  datetime: {
    type: Date, // ✅ single combined field
    default: Date.now,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);

