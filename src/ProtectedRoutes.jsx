import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/authentication/sign-in" />;
  else return <Outlet />;
};
