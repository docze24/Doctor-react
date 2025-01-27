import axios from 'axios';
import { publicRoutes } from '@/utils/helper/constants';
import { getCookie } from '@/utils/helper/functions';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}` || 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key':`${import.meta.env.VITE_X_API_KEY}`
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = getCookie('accessToken'); 
      if (!publicRoutes.includes(config.url) && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.error('API Error:', error);
    alert(`Axios Err: ${error?.message}`)
    return Promise.reject(error);
  }
);

export default axiosInstance;
