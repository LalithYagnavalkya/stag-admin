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
const auth = require("../middleware/auth");

const customerRouter = express.Router();
// customerRouter.post("/", auth,createCustomer);

customerRouter.get("/getallcustomers", auth, getCustomers);

customerRouter.patch("/:id", auth, getCustomer);

customerRouter.delete("/:id", auth, deleteCustomer);

customerRouter.put("/:id", auth, updateCustomer);

customerRouter.patch("/:id", auth, updateCapital);

customerRouter.patch("/:id", auth, updateReturns);

module.exports = customerRouter;
