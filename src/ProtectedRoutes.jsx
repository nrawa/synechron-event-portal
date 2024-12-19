import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ isAuthenticated, children, returnUrl }) => {
    if (!isAuthenticated) {
      return <Navigate to={`/login?returnurl=${returnUrl}`} />;
    }
    return children ? children : <Outlet />;
  };
