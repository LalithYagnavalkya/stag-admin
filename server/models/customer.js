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
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  capital: { type: Number, require: true, default: 0, min: 0 },
  returns: {
    type: String,
  },
  dueDate: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  note: {
    type: [String],
  },

  googleid: {
    type: String,
    // required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  transactions: transactionSchema,
});

module.exports = mongoose.model("Customer", adminSchema);
