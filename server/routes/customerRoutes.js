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
} = require("../controllers/customerController");
const auth = require("../middleware/auth");

const customerRouter = express.Router();
//actual customers
customerRouter.post('/login_with_phone', loginCustomer)
customerRouter.post('/verify_phone_otp', verifyPhoneOtp)

customerRouter.post("/createCustomer", auth, createCustomer);

customerRouter.get("/customers", auth, getCustomers);

customerRouter.get("/getclientreqs", auth, getClinetReqs);

customerRouter.post("/closeDueDate", auth, closeDueDate);

customerRouter.post("/getcustomer", auth, getCustomer);

customerRouter.delete("/:id", auth, deleteCustomer);

customerRouter.put("/:id", auth, updateCustomer);

customerRouter.patch("/:id", auth, updateCapital);

customerRouter.patch("/:id", auth, updateReturns);

customerRouter.post("/exportUsers", auth, exportUsers);

module.exports = customerRouter;
