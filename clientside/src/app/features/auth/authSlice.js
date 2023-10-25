import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const AuthState = {
  _id: null,
  username: null,
  email: null,
  role: {},
  isAuth: false,
  verified: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: AuthState,
  reducers: {
    setlogin: (state, action) => {
      state._id = action.payload.data._id;
      state.username = action.payload.data.username;
      state.email = action.payload.data.email;
      state.role = action.payload.data.role;
      state.verified = action.payload.data.verified;
      state.isAuth = true;
      state.token = action.payload.data.token;

      Cookies.set("_cks_ui", action.payload.data.token);
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      Cookies.remove("_cks_ui");
      state.token = null;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuth = false;
    },
    getMe: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
  },
});

export const { setlogin, logout, register, getMe } = authSlice.actions;

export default authSlice.reducer;
