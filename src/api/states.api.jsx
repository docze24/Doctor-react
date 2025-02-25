import axiosInstance from './axiosInstance';

const createState = (data) => axiosInstance.post('/state', data);

 const getStates = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`state?${queryString}`);
  };

 export default {
    getStates,
    createState
   
  };
  