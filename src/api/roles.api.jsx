import axiosInstance from './axiosInstance';
const leftMenu = () => axiosInstance.get('/roles/modules');
const getModuleAction = () => axiosInstance.get('/roles/modules');

const getUserRoles = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return axiosInstance.get(`roles?${queryString}`);
};

const roleCreate = (postData) => {
  console.log('postData',postData)
  return axiosInstance.post('roles',postData);
};



export default {
  getUserRoles,
  getModuleAction,
  roleCreate,
  leftMenu
};
