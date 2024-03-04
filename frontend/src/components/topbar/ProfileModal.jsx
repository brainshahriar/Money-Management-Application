import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { logoutUser } from "../../services/authServices";
import {SET_LOGIN, SET_NAME, SET_USER} from '../../redux/features/auth/authSlice'

 
const ProfileModal = ({ isOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async() =>{
        await logoutUser();
        dispatch(SET_LOGIN(false));
        dispatch(SET_NAME(''));
        dispatch(SET_USER(''));
        navigate('/login');
    }
  return (
    <>
      {isOpen && (
        <div className="popup-menu">
          <ul>
            <li>Setting</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
