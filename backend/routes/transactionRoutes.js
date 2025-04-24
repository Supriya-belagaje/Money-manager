// const express = require("express");
// const Transaction = require("../models/Transaction");
// const router = express.Router();

// // Get all transactions
// router.get("/", async (req, res) => {
//   try {
//     const transactions = await Transaction.find();
//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add a new transaction
// router.post("/", async (req, res) => {
//   const { amount, category, type } = req.body;
//   if (!amount || !category || !type) return res.status(400).json({ message: "All fields required" });

//   try {
//     const newTransaction = new Transaction({ amount, category, type });
//     await newTransaction.save();
//     res.status(201).json(newTransaction);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middlewares/auth");
const router = express.Router();

// Get all transactions for a user
router.get("/transactions", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const balance = income - expense;

    res.json({ transactions, income, expense, balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new transaction
router.post("/transactions", auth, async (req, res) => {
  const { amount, category, type, date } = req.body;

  if (!amount || !category || !type)
    return res.status(400).json({ message: "All fields required" });

  try {
    const newTransaction = new Transaction({
      amount,
      category,
      type,
      date: date || new Date(),
      userId: req.user.id,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
