const customerModel = require("../models/customer");
const csvtojson = require("csvtojson");
const csvfilepath = "stag.csv";
const Customer = require("../models/customer");

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

const exportUsers = async (req, res) => {
  csvtojson()
    .fromFile(csvfilepath)
    .then((json) => {
      // console.log(json);
      Customer.insertMany(json);
    })
    .then(() => {
      console.log("data inserted");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  updateCapital,
  exportUsers,
};
