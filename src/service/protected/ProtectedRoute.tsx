import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

type Role = "ADMIN" | "AGENCE" | "TOURISTE" | "GUIDE";

interface Props {
  roles: Role[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ roles, children }: Props) => {
  const { hasRole } = useAuth();

  if (!hasRole(...roles)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;