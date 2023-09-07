const Transaction = require("../models/Transaction");

const get_transactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res
      .status(200)
      .json({ success: true, count: transactions.length, data: transactions });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const post_transaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body });
    return res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (error) => error.message
      );
      return res.status(400).json({ success: false, error: messages });
    } else {
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

const delete_transaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, error: "No transaction found" });
    }
    await transaction.deleteOne();
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = { get_transactions, post_transaction, delete_transaction };
