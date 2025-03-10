import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/authentication/sign-in" />;
  else return <Outlet />;
};
