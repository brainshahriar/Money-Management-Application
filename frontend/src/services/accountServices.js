import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// All accounts

const allAccounts = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/account`, config);
  return response.data;
};

// Create a new account

const createAccount = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/account`,
    formData,
    config
  );
  return response.data;
};

// Get a Account
const getAccount = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BACKEND_URL}/api/account/${id}`,config);
  return response.data;
};

// Delete a Account

const deleteAccount = async (id) => {
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };
  const response = await axios.delete(`${BACKEND_URL}/api/account/${id}`,config);
  return response.data;
};

// Update a Account

const updateAccount = async (id,formData) => {
  console.log('from service',id,formData);
  const token = localStorage.getItem("token");
  const config = {
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };
  const response = await axios.put(`${BACKEND_URL}/api/account/${id}`,formData,config);
  return response.data;
};

const accountServices = {
  allAccounts,
  createAccount,
  getAccount,
  deleteAccount,
  updateAccount
};

export default accountServices;
