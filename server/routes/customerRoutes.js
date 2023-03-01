const express = require("express");
const {
  createCustomer,
  closeDueDate,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  updateCapital,
  exportUsers,
  getClinetReqs,
  loginCustomer,
  verifyPhoneOtp,
  deleteClinetReq,
} = require("../controllers/customerController");
const auth = require("../middleware/auth");

const customerRouter = express.Router();
//actual customers
customerRouter.post("/login_with_phone", loginCustomer);
customerRouter.post("/verify_phone_otp", verifyPhoneOtp);

module.exports = customerRouter;
