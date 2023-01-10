const mongoose = require("mongoose");
const { model } = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", adminSchema);
