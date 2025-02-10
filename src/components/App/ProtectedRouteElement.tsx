import React, { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";

interface ProtectedRouteElementProps {
  children: ReactNode;
  fallBackRoute: string;
}

const ProtectedRouteElement = ({ children, fallBackRoute }: ProtectedRouteElementProps) => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      navigate(fallBackRoute, { state: { from: location } });
    }
  }, [isAuthenticated, isAuthChecked, navigate, fallBackRoute, location]);

  if (!isAuthChecked) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRouteElement;
