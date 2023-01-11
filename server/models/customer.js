const mongoose = require("mongoose");
const { model } = require("mongoose");
const transactionSchema = new mongoose.Schema([
  {
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
]);
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  returns: {
    type: Number,
    require: true,
  },
  Captial: { type: Number, required: true, min: 0 },
  transactions: transactionSchema,
});

module.exports = mongoose.model("User", adminSchema);
