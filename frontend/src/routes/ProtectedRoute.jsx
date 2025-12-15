import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute - Redirects to /signin if user is not authenticated
 * Optionally checks userType for role-based access
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, userType } = useAuth();
    const location = useLocation();

    // No token → redirect to login
    if (!token) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // If allowedRoles specified, check if user's role matches
    if (allowedRoles && !allowedRoles.includes(userType)) {
        // Redirect to appropriate dashboard based on role
        const roleRedirects = {
            Student: "/dashboard",
            Teacher: "/teacher/dashboard",
            Admin: "/admin/dashboard",
        };
        return <Navigate to={roleRedirects[userType] || "/dashboard"} replace />;
    }

    return children;
};

export default ProtectedRoute;
