import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountServices from "../../../services/accountServices";

const initialState = {
  account: null,
  total_balance: 0,
  accounts: [],
  currency: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  createErrorMessage: [],
  editErrorMessage: [],
  message:[]
};

// get all accounts

export const getAllAccounts = createAsyncThunk(
  "accounts/get-all",
  async (_, thunkAPI) => {
    try {
      return await accountServices.allAccounts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//create a new account

export const createAccount = createAsyncThunk(
  "accounts/create",
  async (formData, thunkAPI) => {
    try {
      return await accountServices.createAccount(formData);
    } catch (error) {
      const message = error.response.data.errors;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get single account

export const getAccount = createAsyncThunk(
  "account/get-single-account",
  async (id, thunkAPI) => {
    try {
      return await accountServices.getAccount(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete single account
export const deleteAccount = createAsyncThunk(
  "account/delete-account",
  async (id, thunkAPI) => {
    try {
      return await accountServices.deleteAccount(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete single account
export const updateAccount = createAsyncThunk(
  "account/update-account",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await accountServices.updateAccount(id, formData);
    } catch (error) {
      const message = error.response.data.errors;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    SET_TOTAL_BALANCE(state, action) {
      state.total_balance = action.payload;
    },
    SET_CURRENCY(state, action) {
      state.currency = action.payload;
    },
    ACCOUNT_CREATE_ERROR_MESSAGE(state,action){
      state.createErrorMessage = action.payload;
    },
    ACCOUNT_EDIT_ERROR_MESSAGE(state,action){
      state.editErrorMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.accounts.push(action.payload);
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.createErrorMessage = action.payload;
      })
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.total_balance = action.payload.total_balance;
        state.accounts = action.payload.accounts;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.account = action.payload.result;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // toast.success("Product deleted successfully");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // toast.success("Product updated successfully");
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.editErrorMessage = action.payload;
        // toast.error(action.payload);
      });
  },
});

export const { SET_CURRENCY, SET_TOTAL_BALANCE,ACCOUNT_CREATE_ERROR_MESSAGE,ACCOUNT_EDIT_ERROR_MESSAGE } = accountSlice.actions;

export const selectIsLoading = (state) => state.account.isLoading;
export const selectAccount = (state) => state.account.account;
export const selectCurrency = (state) => state.account.currency;
export const selectTotalBalance = (state) => state.account.total_balance;

export default accountSlice.reducer;
