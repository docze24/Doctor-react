import React, { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from '@/utils/helper/functions';
//import axiosInstance from '../api/axiosInstance';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  
 // const signupApi = (userData) => axiosInstance.post('/doctor/signup', userData);

  const login = (user, accessToken, refreshToken) => {
    // console.log("login called");
    setUser(user);
    setCookie('user', JSON.stringify(user), 7); 
    setCookie('accessToken', JSON.stringify(accessToken), 7);
    setCookie('refreshToken', JSON.stringify(refreshToken), 7);
  };


  const logout = () => {
    // console.log("logout called");
    setUser(null);
    deleteCookie('user'); 
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  };

  // Signup function: Calls the signup API and stores user data
  // const signup = async (userData) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const { user, accessToken, refreshToken } = await signupApi(userData);

  //     login(user, accessToken, refreshToken);
  //     return user;  // Return user data for further use (if needed)
  //   } catch (err) {
  //     setError(err.message);  
  //     console.error('Signup error:', err);
  //     throw err; 
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const savedUser = getCookie('user');
  useEffect(() => {
    // console.log({savedUser:savedUser});
    if (savedUser) {
      setUser(JSON.parse(savedUser)); 
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, savedUser  }}>
      {children}
    </UserContext.Provider>
  );
};
