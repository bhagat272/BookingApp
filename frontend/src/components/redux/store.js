import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import userReducer from './slices/userSlice'
import serviceReducer from './slices/serviceSlice'

const store = configureStore({
    reducer: {
        login: LoginReducer,
         users : userReducer,
         service : serviceReducer

    },
});

export default store;
