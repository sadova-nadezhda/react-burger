import { Navigate, useLocation } from "react-router-dom";
import { ResetPasswordPage } from "../../pages";

const ResetPasswordRoute = () => {
  const location = useLocation();

  if (!location.state?.emailEntered) {
    return <Navigate to="/forgot-password" />;
  }

  return <ResetPasswordPage />;
};

export default ResetPasswordRoute;
