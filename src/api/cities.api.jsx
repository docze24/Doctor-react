import axiosInstance from './axiosInstance';

const createCity = (data) => axiosInstance.post('/city', data);

const editCity = (data) => axiosInstance.put(`/city/${data.cityId}`, data);

const getCityById = (cityId) => axiosInstance.get(`/city/${cityId}`);

const updateCityStatus = (cityId) => axiosInstance.get(`/city/${cityId}`);

 const getCity = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`city?${queryString}`);
  };

 export default {
    getCity,
    createCity,
    editCity,
    getCityById,
    updateCityStatus
   
  };
  