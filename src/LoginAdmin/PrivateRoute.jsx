import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexto/AuthContext';

const PrivateRoute = ({ roles }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    
    return <Navigate to="/" />;
  }

  if (roles && roles.length > 0 && (!auth.user || !roles.includes(auth.user.role))) {
    
    return <Navigate to="/unauthorized" />;
  }
  
  return <Outlet />;
};

export default PrivateRoute;