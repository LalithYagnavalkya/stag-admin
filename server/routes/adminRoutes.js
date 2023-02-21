const express = require("express");
const {
  signup,
  signin,
  createCustomer,
  closeDueDate,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateReturns,
  deleteClinetReq,
  updateCapital,
  getClinetReqs,
} = require("../controllers/adminController");
const adminRoutes = express.Router();
const auth = require("../middleware/auth");

adminRoutes.post("/signup", signup);

adminRoutes.post("/signin", signin);

adminRoutes.post("/createCustomer", auth, createCustomer);

adminRoutes.post("/customers", auth, getCustomers);

adminRoutes.get("/getclientreqs", auth, getClinetReqs);

adminRoutes.post("/deleteclientreq", auth, deleteClinetReq);

adminRoutes.post("/closeDueDate", auth, closeDueDate);

adminRoutes.post("/getcustomer", auth, getCustomer);

adminRoutes.delete("/:id", auth, deleteCustomer);

adminRoutes.put("/:id", auth, updateCustomer);

adminRoutes.patch("/:id", auth, updateCapital);

adminRoutes.patch("/:id", auth, updateReturns);

// adminRoutes.post("/exportUsers", auth, exportUsers);
module.exports = adminRoutes;
