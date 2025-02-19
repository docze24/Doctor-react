import React, { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from '@/utils/helper/functions';



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user, accessToken, refreshToken) => {
    // console.log("login called");
    setUser(user);
    setCookie('user', JSON.stringify(user), 7); 
    setCookie('accessToken', accessToken, 7);
    setCookie('refreshToken', refreshToken, 7);
  };



  const logout = () => {
    // console.log("logout called");
    setUser(null);
    deleteCookie('user'); 
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  };

  const savedUser = getCookie('user');
useEffect(() => {
    try {
        if (savedUser && savedUser !== "undefined") { 
            setUser(JSON.parse(savedUser));
        } else {
            setUser(null); 
        }
    } catch (error) {
        console.error("Error parsing savedUser from cookie:", error);
        setUser(null);
    }
}, []);


  return (
    <UserContext.Provider value={{ user, login, logout, savedUser ,setUser  }}>
      {children}
    </UserContext.Provider>
  );
};

