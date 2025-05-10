import axiosInstance from './axiosInstance';

const fetchDoctorData = () => axiosInstance.get('/doctor/data');

const createDoctorItem = (item) => axiosInstance.post('/doctor/items', item);

export default {
  fetchDoctorData,
  createDoctorItem,
};
