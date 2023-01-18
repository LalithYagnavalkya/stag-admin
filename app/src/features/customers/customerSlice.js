import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerServices from "./customerServices";

const initialState = {
  customers: [],
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
      });
  },
});
export const { reset, setUser } = customerSlice.actions;
export default customerSlice.reducer;
