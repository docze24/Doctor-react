import axiosInstance from './axiosInstance';



 const getCountries = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`country?${queryString}`);
  };

 export default {
    getCountries
   
  };
  