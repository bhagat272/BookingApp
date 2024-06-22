import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import userReducer from './slices/userSlice'
const store = configureStore({
    reducer: {
        login: LoginReducer,
         users : userReducer
    },
});

export default store;
