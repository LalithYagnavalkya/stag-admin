const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    capital: {
      type: Number,
      required: true,
      default: 0,
    },
    returns: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    joiningDate: {
      type: String,
      required: true,
      default: () => Date.now(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
