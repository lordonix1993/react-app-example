import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";

const rootReduser = combineReducers({
    auth: authSlice
})

export const store = configureStore({
    reducer: rootReduser
})