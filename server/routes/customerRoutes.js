const express = require("express");
const {
  createCustomer,
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
// customerRouter.post("/", auth,createCustomer);

customerRouter.get("/customers", auth, getCustomers);

customerRouter.patch("/:id", auth, getCustomer);

customerRouter.delete("/:id", auth, deleteCustomer);

customerRouter.put("/:id", auth, updateCustomer);

customerRouter.patch("/:id", auth, updateCapital);

customerRouter.patch("/:id", auth, updateReturns);

customerRouter.post("/exportUsers", auth, exportUsers);

module.exports = customerRouter;
