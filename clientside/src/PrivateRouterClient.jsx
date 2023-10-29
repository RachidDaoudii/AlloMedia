import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouteClient = ({ children }) => {
  const auth  = useSelector((state) => state.auth);
  return (
    <div>
      {auth.isAuth && auth.role.name === "client" ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRouteClient;
