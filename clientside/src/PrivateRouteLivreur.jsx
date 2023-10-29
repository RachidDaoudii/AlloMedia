import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouteLivreur = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      {auth.isAuth && auth.role.name === "livreur" ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRouteLivreur;
