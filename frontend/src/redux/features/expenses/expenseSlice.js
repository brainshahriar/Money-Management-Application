import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import expenseServices from "../../../services/expenseServices";

const initialState = {
  expense: null,
  expenses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  createErrorMessage: [],
  editErrorMessage: [],
  message: [],
  allAccounts: [],
  allCategories: [],
};

// get all expenses

export const getAllExpenses = createAsyncThunk(
    "expense/get-all",
    async (_, thunkAPI) => {
      try {
        return await expenseServices.allExpenses();
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

  // create a new expense

export const createExpense = createAsyncThunk(
  "expense/create",
  async (formData, thunkAPI) => {
    try {
      return await expenseServices.createExpense(formData);
    } catch (error) {
      const message = error.response.data.errors;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

  const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
      EXPENSE_CREATE_ERROR_MESSAGE(state, action) {
        state.createErrorMessage = action.payload;
      },
      EXPENSE_EDIT_ERROR_MESSAGE(state, action) {
        state.editErrorMessage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllExpenses.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllExpenses.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.expenses = action.payload.expense;
          state.allAccounts = action.payload.accounts;
          state.allCategories = action.payload.categories;
        })
        .addCase(getAllExpenses.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          // toast.error(action.payload);
        })
        .addCase(createExpense.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createExpense.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          // state.accounts.push(action.payload);
        })
        .addCase(createExpense.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.createErrorMessage = action.payload;
        })
    },
  });

  export const {
    EXPENSE_CREATE_ERROR_MESSAGE,
    EXPENSE_EDIT_ERROR_MESSAGE,
  } = expenseSlice.actions;
  
  export const selectIsLoading = (state) => state.expense.isLoading;
  export const selectExpense = (state) => state.expense.expense;
  
  export default expenseSlice.reducer;