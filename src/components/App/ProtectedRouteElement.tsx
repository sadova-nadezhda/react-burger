import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';

interface ProtectedRouteElementProps {
  children: ReactNode;
  fallBackRoute: string;
}

const ProtectedRouteElement = ({ children, fallBackRoute }: ProtectedRouteElementProps) => {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(fallBackRoute);
    }
  }, [isAuthenticated, navigate, fallBackRoute]);

  return <>{children}</>;
}

export default ProtectedRouteElement;
