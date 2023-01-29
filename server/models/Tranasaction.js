const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  sender: String,
  amount: String,
  reciver: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);
