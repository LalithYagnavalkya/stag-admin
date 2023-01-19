import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import CustomerReducer from "../features/customers/customerSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    customers: CustomerReducer,
  },
});
