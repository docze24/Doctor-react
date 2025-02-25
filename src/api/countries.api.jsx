import axiosInstance from './axiosInstance';



 const getCountries = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`country?${queryString}`);
  };

  const getCountryDD = (data) => {
    return axiosInstance.get(`country/dd`,data);
  };

  const getCountryById = (countryId) => axiosInstance.get(`/country/${countryId}`);

 export default {
    getCountries,
    getCountryDD,
    getCountryById
   
  };
  