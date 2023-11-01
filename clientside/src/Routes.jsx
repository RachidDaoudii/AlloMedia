import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/pages/login";
import Register from "./app/pages/Register";
import DashboardManager from "./app/pages/DashboardManager";
import ForGetPassword from "./app/pages/forgetPassword";
import RestPassword from "./app/pages/restPAssword";
import PrivateRoute from "./PrivateRouteManager";
import DashboardClient from "./app/pages/DashboardClient";
import DashboardLivreur from "./app/pages/DashboadLivreur";
import Page404 from "./app/pages/404";
import PrivateRouteClient from "./PrivateRouterClient";
import PrivateRouteLivreur from "./PrivateRouteLivreur";
import Profile from "./app/pages/Profile";
import InnerContent from "./app/components/InnerContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setlogin } from "./app/features/auth/authSlice";

const MainRoute = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("USER") || "{}");

  useEffect(async () => {
    await dispatch(setlogin(user));
  }, []);

  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForGetPassword />} />
      <Route path="/restPassword" element={<RestPassword />} />
      <Route path="/404" element={<Page404 />} />

      <Route element={<InnerContent />}>
        <Route
          path={
            auth.role.name === "client"
              ? "/client/me"
              : auth.role.name === "livreur"
              ? "/livreur/me"
              : "/manager/me"
          }
          element={<Profile />}
        />
      </Route>

      <Route
        path="/manager"
        element={
          <PrivateRoute>
            <DashboardManager />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/client"
        element={
          <PrivateRouteClient>
            <DashboardClient />
          </PrivateRouteClient>
        }
      />
      <Route
        path="/livreur"
        element={
          <PrivateRouteLivreur>
            <DashboardLivreur />
          </PrivateRouteLivreur>
        }
      />
    </Routes>
  );
};

export default MainRoute;
