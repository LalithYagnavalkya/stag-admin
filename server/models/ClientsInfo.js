const mongoose = require("mongoose");
const ClientInfoSchema = new mongoose.Schema({
  name: String,
  phone: String,
  bankaccount: String,
  ifsc: String,
  branch: String,
  photo: String,
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model("clientReqs", ClientInfoSchema);
