// src/components/core/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  console.log("Token:", token); // You already have this

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />; // This renders child routes
}
