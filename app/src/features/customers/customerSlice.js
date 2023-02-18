import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerServices from "./customerServices";

const initialState = {
  customers: [],
  reqs: [],
  currentCustomer: {},
  filter: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllCustomers = createAsyncThunk(
  "customers/getall",
  async (user, thunkAPI) => {
    try {
      console.log(user);
      return await customerServices.getAllCustomers(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getReqs = createAsyncThunk(
  "customers/getreqs",
  async (user, thunkAPI) => {
    try {
      console.log(user);
      return await customerServices.getReqs(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const AddCustomer = createAsyncThunk(
  "customers/addUser",
  async (user, thunkAPI) => {
    try {
      return await customerServices.AddCustomer(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const GetCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (user, thunkAPI) => {
    try {
      console.log("get customer triggered");
      return await customerServices.getCustomer(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user !== "") state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      })
      .addCase(getReqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReqs.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user !== "") state.isSuccess = true;
        state.reqs = action.payload;
      })
      .addCase(getReqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // state.reqs = null;
      })
      .addCase(AddCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        // if (state.user !== "") state.isSuccess = true;
        // state.customers = action.payload;
      })
      .addCase(AddCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      })
      .addCase(GetCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCustomer = action.payload;
        // if (state.user !== "") state.isSuccess = true;
        // state.customers = action.payload;
      })
      .addCase(GetCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
      });
  },
});
export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
