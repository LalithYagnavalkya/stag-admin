const customerModel = require("../models/customer");
const csvtojson = require("csvtojson");
const csvfilepath = "stag.csv";
const Customer = require("../models/customer");

const createCustomer = (req, res) => {
  console.log(req.body);
};

const getCustomers = (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = req.query.search || 5;
    const search = req.query.search || "";
    const sort = req.query.sort || "due";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    req.sort = {};

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
  } catch (err) {
    console.log(err);
  }
};

const updateCustomer = (req, res) => {
  console.log(req.body);
  res.send("hello");
};

const deleteCustomer = (req, res) => {};

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
