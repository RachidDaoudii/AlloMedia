import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";



const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuth && auth.role.name === "manager") {
      navigate("/manager");
    }
  }, [auth.isAuth, auth.role.name, navigate]);

  return (
    <div>
      {auth.isAuth && auth.role.name === "manager" ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
