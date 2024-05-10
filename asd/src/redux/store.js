import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/users"

export const store = configureStore({
    reducer : {
        user : userReducer,
    }
});