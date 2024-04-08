import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/redux/slices/authSlices";
import chatSlice from "@/redux/slices/chatSlices";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});
