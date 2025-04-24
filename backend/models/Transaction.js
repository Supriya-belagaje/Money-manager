// const mongoose = require("mongoose");

// const TransactionSchema = new mongoose.Schema({
//   amount: { type: Number, required: true },
//   category: { type: String, required: true },
//   type: { type: String, enum: ["income", "expense"], required: true },
//   date: { type: Date, default: Date.now },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// module.exports = mongoose.model("Transaction", TransactionSchema);

// models/Transaction.js
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
  type: { // income or expense
    type: String,
    enum: ["income", "expense"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
