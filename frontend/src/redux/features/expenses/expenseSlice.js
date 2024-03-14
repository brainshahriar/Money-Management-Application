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

// // delete single expense
export const deleteExpense = createAsyncThunk(
  "expense/delete-expense",
  async (id, thunkAPI) => {
    try {
      return await expenseServices.deleteExpense(id);
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

// // update single expense
export const updateExpense = createAsyncThunk(
  "expense/update-expense",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await expenseServices.updateExpense(id, formData);
    } catch (error) {
      const message = error.response.data.errors;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// //get single expense

export const getExpense = createAsyncThunk(
  "expense/get-single-expense",
  async (id, thunkAPI) => {
    try {
      return await expenseServices.getExpense(id);
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
        .addCase(deleteExpense.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteExpense.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          // toast.success("Product deleted successfully");
        })
        .addCase(deleteExpense.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          // toast.error(action.payload);
        })
        .addCase(getExpense.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getExpense.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.expense = action.payload.result;
        })
        .addCase(getExpense.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          // toast.error(action.payload);
        })
        .addCase(updateExpense.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateExpense.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          // toast.success("Product updated successfully");
        })
        .addCase(updateExpense.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.editErrorMessage = action.payload;
          // toast.error(action.payload);
        });
    },
  });

  export const {
    EXPENSE_CREATE_ERROR_MESSAGE,
    EXPENSE_EDIT_ERROR_MESSAGE,
  } = expenseSlice.actions;
  
  export const selectIsLoading = (state) => state.expense.isLoading;
  export const selectExpense = (state) => state.expense.expense;
  
  export default expenseSlice.reducer;