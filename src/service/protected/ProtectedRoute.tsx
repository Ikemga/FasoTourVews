import { Navigate } from "react-router-dom";
import { getAccessToken } from "../api/Api";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ children, roles }) => {
  const token = getAccessToken();
  const { hasRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (roles && !hasRole(...roles)) return <Navigate to="/403" replace />;

  return children;
};

export default ProtectedRoute;