import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contentApi/userContext';

const RequireAuth = () => {
  const { user, savedUser } = useContext(UserContext);
  // console.log({user:user});
  
  return user || savedUser ? <Outlet /> : <Navigate to="/en/login" />;
};

export default RequireAuth;
