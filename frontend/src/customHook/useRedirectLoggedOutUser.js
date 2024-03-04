import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const redirectLoggedOutUser = () => {
      if (token) {
        dispatch(SET_LOGIN(true));
      }
      if (!token) {
        console.log("Session Expired,Please log in to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, dispatch, path]);
};

export default useRedirectLoggedOutUser;
