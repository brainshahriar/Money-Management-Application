import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryServices from "../../../services/categoryServices";

const initialState = {
  category: null,
  category_type: null,
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  createErrorMessage: [],
  editErrorMessage: [],
  message: [],
};

// get all accounts

export const getAllCategory = createAsyncThunk(
  "category/get-all",
  async (_, thunkAPI) => {
    try {
      return await categoryServices.allCategory();
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

// create a new category

export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      return await categoryServices.createCategory(formData);
    } catch (error) {
      const message = error.response.data.errors;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// //get single account

export const getCategory = createAsyncThunk(
  "category/get-single-category",
  async (id, thunkAPI) => {
    try {
      return await categoryServices.getCategory(id);
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

// // delete single account
export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await categoryServices.deleteCategory(id);
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

// // update single account
export const updateCategory = createAsyncThunk(
  "category/update-category",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await categoryServices.updateCategory(id, formData);
    } catch (error) {
      const message = error.response.data.errors;
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    SET_CATEGORY_TYPE(state, action) {
      state.category_type = action.payload;
    },
    CATEGORY_CREATE_ERROR_MESSAGE(state, action) {
      state.createErrorMessage = action.payload;
    },
    CATEGORY_EDIT_ERROR_MESSAGE(state, action) {
      state.editErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.accounts.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.createErrorMessage = action.payload;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.category_type = action.payload.category_type;
        state.categories = action.payload.result;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.category = action.payload.result;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // toast.success("Product deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // toast.error(action.payload);
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // toast.success("Product updated successfully");
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.editErrorMessage = action.payload;
        // toast.error(action.payload);
      });
  },
});

export const {
  SET_CATEGORY_TYPE,
  CATEGORY_CREATE_ERROR_MESSAGE,
  CATEGORY_EDIT_ERROR_MESSAGE,
} = categorySlice.actions;

export const selectIsLoading = (state) => state.category.isLoading;
export const selectCategory = (state) => state.category.category;
export const selectCategoryType = (state) => state.category.category_type;

export default categorySlice.reducer;
