import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features//auth/authSlice";
import { authApi } from "./services/authApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
