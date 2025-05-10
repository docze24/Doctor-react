import axiosInstance from './axiosInstance';

const createState = (data) => axiosInstance.post('/state', data);

const editState = (stateId, data) => axiosInstance.put(`/state/${stateId}`, data);

const getStatesById = (stateId) => axiosInstance.get(`/state/${stateId}`);

const getStateDD = (data) => {
    return axiosInstance.get(`state/dd`,data);
  };


 const getStates = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`state?${queryString}`);
  };

 export default {
    getStates,
    getStateDD,
    createState,
    editState,
    getStatesById
   
  };
  