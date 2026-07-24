import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    
  },
});