import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token: adminToken, admin } = useSelector((state) => state.admin);
  const { token: userToken, user } = useSelector((state) => state.auth);

  // Agar koi login hai
  if (adminToken && admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (userToken && user) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;