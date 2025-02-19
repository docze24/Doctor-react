import axiosInstance from './axiosInstance';
const leftMenu = () => axiosInstance.get('/roles/modules');

export default {
  leftMenu,
};
