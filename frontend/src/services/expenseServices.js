import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// All category

const allExpenses = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/expenses`, config);
  return response.data;
};

// Create a new category

const createExpense = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/expenses`,
    formData,
    config
  );
  return response.data;
};

// Get a category
const getExpense = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/expense/${id}`,config);
  return response.data;
};

// Delete a category

const deleteExpense = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };
  const response = await axios.delete(`${BACKEND_URL}/api/expenses/${id}`,config);
  return response.data;
};

// Update a category

const updateExpense = async (id,formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };
  const response = await axios.put(`${BACKEND_URL}/api/expenses/${id}`,formData,config);
  return response.data;
};

const expenseServices = {
  allExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense
};

export default expenseServices;
