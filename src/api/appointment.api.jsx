import axiosInstance from './axiosInstance';

const fetchAppointmentData = () => axiosInstance.get('/appointment/data');

const deleteAppointmentItem = (itemId) => axiosInstance.delete(`/appointment/items/${itemId}`);

export default {
  fetchAppointmentData,
  deleteAppointmentItem,
};
