const express = require("express");
const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  updateCapital,
} = require("../controllers/customerController");

const customerRouter = express.Router();

module.exports = customerRouter;
