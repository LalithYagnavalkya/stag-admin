const customerModel = require("../models/customer");

const createCustomer = (req, res) => {
  console.log(req.body);
};
const updateCustomer = (req, res) => {
  console.log(req.body);
  res.send("hello");
};
const deleteCustomer = (req, res) => {};
const getCustomers = (req, res) => {};
const getCustomer = (req, res) => {};
const updateReturns = (req, res) => {};
const updateCapital = (req, res) => {};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  updateCapital,
};
