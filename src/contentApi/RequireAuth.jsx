// src/components/RequireAuth.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contentApi/userContext';

const RequireAuth = () => {
  const { user } = useContext(UserContext);

  // If user is not logged in, redirect to login page
  return user ? <Outlet /> : <Navigate to="/en/login" />;
};

export default RequireAuth;
