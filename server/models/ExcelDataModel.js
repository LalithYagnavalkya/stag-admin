const mongoose = require("mongoose");

const excelSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  PhoneNumber: Number,
});

module.exports = mongoose.model("Excel", excelSchema);
