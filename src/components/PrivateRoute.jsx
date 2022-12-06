import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
export default function PrivateRoute() {
  const { loggedIn, loadingStatus } = useAuthStatus();
  if (loadingStatus) {
    return <h4>Loading...</h4>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
