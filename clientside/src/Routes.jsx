import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/pages/login";
import Register from "./app/pages/Register";
import Dashboard from "./app/pages/Dashboard";
import ForGetPassword from "./app/pages/forgetPassword";
import { useSelector } from "react-redux";
import RestPassword from "./app/pages/restPAssword";
import PrivateRoute from "./privateRoute";

const MainRoute = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Routes basename={"http://localhost:5173/"}>
      <Route
        path="/login"
        element={!auth.isAuth ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={auth.isAuth ? <Dashboard /> : <Navigate to="/login" />}
      />

      <PrivateRoute path="/dashboard" element={<Dashboard />} />

      
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForGetPassword />} />
      <Route path="/restPassword" element={<RestPassword />} />
    </Routes>
  );
};

export default MainRoute;
