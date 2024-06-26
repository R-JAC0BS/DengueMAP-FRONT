import { useContext } from "react";
import { UserContext } from "../../../contex/user";
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
