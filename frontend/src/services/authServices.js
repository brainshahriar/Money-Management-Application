import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Login User

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/global/login`,
      userData
    );

    if (response.status === 200) {
      toast.success("Welcome to Dashboard");
    }

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// logout User

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    const response = await axios.post(`${BACKEND_URL}/api/logout`,null ,config);
    if (response.status === 200) {
      localStorage.removeItem('token');
      console.log(response.result.data);
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};
