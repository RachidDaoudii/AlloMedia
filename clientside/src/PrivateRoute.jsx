import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((state) => state);
  const allowedRoles = ["manager", "client", "livreur"];
  const hasAccess = auth.role.name && allowedRoles.includes(auth.role.name);

  return <div>{hasAccess ? children : null}</div>;
};

export default PrivateRoute;
