import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/pages/login";
import Register from "./app/pages/Register";
import Dashboard from "./app/pages/Dashboard";
import ForGetPassword from "./app/pages/forgetPassword";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgetpassword" element={<ForGetPassword />} />
    </Routes>
  );
};

export default MainRoute;
