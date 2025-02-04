import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRouteElement = ({ element, onlyUnAuth = false }) => {
  const { isAuthenticated, lastAttemptedPath, setLastAttemptedPath } = useAuth();
  const location = useLocation();

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to={lastAttemptedPath || '/'} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    setLastAttemptedPath(location.pathname);
    return <Navigate to='/login' replace />;
  }

  return element;
};

export default ProtectedRouteElement;
