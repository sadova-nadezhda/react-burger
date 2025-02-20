import { ReactNode, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";

interface ProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, anonymous = false, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);
  const isAuthenticated = !!user;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      navigate(redirectTo, { replace: true, state: { from: location.pathname } });
    }
  }, [isAuthChecked, isAuthenticated, navigate, redirectTo, location.pathname]);

  if (!isAuthChecked) {
    return <p>Загрузка...</p>;
  }

  if (anonymous && isAuthenticated) {
    const from = location.state?.from || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;