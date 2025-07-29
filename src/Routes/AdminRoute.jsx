import React from "react";
import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div className="flex items-center mx-auto loading loading-infinity loading-xl"></div>
    );
  }

  if (!user || (role !== "volunteer" && role !== "admin")) {
    return <Navigate state={location?.pathname} to="/forbidden"></Navigate>;
  }

  return children;
};

export default AdminRoute;
