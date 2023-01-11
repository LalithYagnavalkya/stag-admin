const mongoose = require("mongoose");
const { model } = require("mongoose");
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    requierd: true,
  },
  captial: {
    type: Number,
  },
  // transaction: [{
  //   transaction: {type: n}
  // }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", customerSchema);
