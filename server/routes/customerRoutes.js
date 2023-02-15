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
} = require("../controllers/customerController");
const auth = require("../middleware/auth");

const customerRouter = express.Router();

customerRouter.post("/createCustomer", auth, createCustomer);

customerRouter.get("/customers", auth, getCustomers);

customerRouter.post("/closeDueDate", auth, closeDueDate);

customerRouter.post("/getcustomer", auth, getCustomer);

customerRouter.delete("/:id", auth, deleteCustomer);

customerRouter.put("/:id", auth, updateCustomer);

customerRouter.patch("/:id", auth, updateCapital);

customerRouter.patch("/:id", auth, updateReturns);

customerRouter.post("/exportUsers", auth, exportUsers);

module.exports = customerRouter;
