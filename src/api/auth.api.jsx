import axiosInstance from './axiosInstance';

const login = (credentials) => axiosInstance.post('/doctor/login', credentials);

const signup = (userData) => axiosInstance.post('/auth/signup', userData);

const forgotPassword = (email) => axiosInstance.post('/auth/forgot-password', { email });

export default {
  login,
  signup,
  forgotPassword,
};
