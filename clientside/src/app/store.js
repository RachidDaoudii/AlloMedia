import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features//auth/authSlice";
import { authApi } from "./services/auth/authApi";
import roleSlice from "./features/roles/roleSlice";
import { roleApi } from "./services/role/roleApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    role: roleSlice,
    [roleApi.reducerPath]: roleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, roleApi.middleware]),
});

export default store;
