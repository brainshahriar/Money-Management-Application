import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// All category

const allCategory = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/categories`, config);
  return response.data;
};

// Create a new category

const createCategory = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/categories`,
    formData,
    config
  );
  return response.data;
};

// Get a category
const getCategory = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/categories/${id}`,config);
  return response.data;
};

// Delete a category

const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };
  const response = await axios.delete(`${BACKEND_URL}/api/categories/${id}`,config);
  return response.data;
};

// Update a category

const updateCategory = async (id,formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };
  const response = await axios.put(`${BACKEND_URL}/api/categories/${id}`,formData,config);
  return response.data;
};

const categoryServices = {
  allCategory,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory
};

export default categoryServices;
