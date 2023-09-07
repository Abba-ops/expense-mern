const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please enter a text"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please enter an amount"],
    },
  },
  { timestamps: true }
);

module.exports = model("Transaction", TransactionSchema);
