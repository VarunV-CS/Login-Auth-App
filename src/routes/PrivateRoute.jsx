import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = !!storedUser;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
