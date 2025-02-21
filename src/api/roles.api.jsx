import axiosInstance from './axiosInstance';
const leftMenu = () => axiosInstance.get('/roles/modules');
const getModuleAction = () => axiosInstance.get('/roles/getModuleAction');

const getUserRoles = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return axiosInstance.get(`doctor-user?${queryString}`);
};


export default {
  getUserRoles,
  leftMenu
};
