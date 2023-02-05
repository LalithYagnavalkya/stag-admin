const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requierd: true,
    },
    email: {
      type: String,
      max: 50,
    },
    password: {
      type: String,
      // required: true,
    },
    phoneNumber: String,
    capital: {
      type: String,
      required: true,
    },
    returns: Array,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    joiningDate: {
      type: String,
      default: Date.now(),
      required: true,
    },
    previousDueDate: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    numberOfMonthsPaid: {
      type: Number,
    },

    _d: String,
    isDue: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
    },
    bank_no: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
