import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";

interface ProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, anonymous = false, redirectTo = "/login" }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;