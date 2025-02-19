import axiosInstance from './axiosInstance';

const login = (credentials) => axiosInstance.post('/doctor/login', credentials);

 const createUser = (data)=> axiosInstance.post('user/create',data);

 const editUser = (data)=> axiosInstance.post('user/edit',data);


 export default {
   createUser,
   editUser
  };
  