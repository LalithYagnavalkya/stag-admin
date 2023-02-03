const mongoose = require("mongoose");
const ClientInfoSchema = new mongoose.Schema({
  name: String,
  phone: String,
  bankaccount: String,
  ifsc: String,
  branch: String,
  photo: String,
});

module.exports = mongoose.model("client", ClientInfoSchema);
