import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      );
    }
    if (!user) {
      return <Navigate state={location?.pathname} to="/login"></Navigate>;
    }

    return children;
};

export default PrivateRoute;