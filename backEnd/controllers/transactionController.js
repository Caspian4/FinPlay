import Transaction from "../models/Transaction.js";

/// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description , roundUp} = req.body;
    const calculatedRoundUp =
      roundUp !== undefined ? roundUp : 0;
      const finalAmount = amount + calculatedRoundUp;
    const newTransaction = new Transaction({
      user: req.user._id, // â link to logged-in user
      type,
      amount: finalAmount,
      category,
      description,
      roundUp: calculatedRoundUp,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Transactions for logged-in user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }) // â only this user's
      .sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get Transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ msg: "Transaction not found" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, roundUp } = req.body;

    const calculatedRoundUp =
      roundUp !== undefined ? roundUp : Math.ceil(amount) - amount;

    const finalAmount = amount + calculatedRoundUp;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        type,
        amount: finalAmount,        // rounded amount
        category,
        description,
        roundUp: calculatedRoundUp, // leftover
      },
      { new: true }
    );

    if (!updatedTransaction)
      return res.status(404).json({ msg: "Transaction not found" });

    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) return res.status(404).json({ msg: "Transaction not found" });

    res.json({ msg: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
