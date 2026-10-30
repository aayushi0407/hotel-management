import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "5rem", color: "var(--text-muted)" }}>
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired) {
    const userRole = user.userType?.toLowerCase();
    if (roleRequired.toLowerCase() !== userRole) {
      // If role doesn't match, redirect to their proper dashboard
      return <Navigate to={userRole === "admin" ? "/admin" : "/user"} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
