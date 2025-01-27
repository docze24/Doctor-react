import React, { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from '@/utils/helper/functions';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const savedUser = getCookie('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); 
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
