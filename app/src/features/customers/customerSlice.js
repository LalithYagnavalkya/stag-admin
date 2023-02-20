import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "../../baseUrl";
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
  isClientReqDeleted: false,
};

export const getAllCustomers = createAsyncThunk(
  "customers/getall",

  async (obj, { dispatch, getState, signal }) => {
    const { token, filter, query } = obj;
    const updatedToken = "Bearer " + token;
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      console.log("canceelled");
      source.cancel();
    });
    const controller = new AbortController();
    const response = await baseUrl.post(
      "/customers",
      { query, filter },
      { headers: { Authorization: updatedToken } },
      {
        cancelToken: source.token,
        signal: controller.signal,
      }
    );
    // const response = await controller.abort();
    console.log(response.data);
    return response.data;
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

export const DeleteClinetReq = createAsyncThunk(
  "customer/deleteReq",
  async (user, thunkAPI) => {
    try {
      console.log("Delete Customer triggered");
      return await customerServices.deleteReq(user);
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
        state.reqs = state.reqs.filter((req) => req._id !== action.payload._id);
        toast.success("User Created");

        // if (state.user !== "") state.isSuccess = true;
        // state.customers = action.payload;
      })
      .addCase(AddCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = null;
        toast.error("Something went wrong try again later");
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
      })
      .addCase(DeleteClinetReq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteClinetReq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reqs = state.reqs.filter((req) => req._id !== action.payload);
        toast.success("Request deleted");
        state.isClientReqDeleted = true;
      })
      .addCase(DeleteClinetReq.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isClientReqDeleted = false;
        toast.error("somethinfg went wrong");
      });
  },
});
export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
