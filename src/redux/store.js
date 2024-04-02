import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/slices/authSlices";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
