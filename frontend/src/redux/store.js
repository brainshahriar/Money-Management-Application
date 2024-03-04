import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice'
import accountReducer from './features/account/accountSlice';
import categoryReducer from './features/category/categorySlice';


export const store = configureStore({
    reducer:{
        auth:authReducer,
        account:accountReducer,
        category:categoryReducer
    }
});