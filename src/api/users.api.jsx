import axiosInstance from './axiosInstance';



 const createUser = (data)=> axiosInstance.post('doctor/user',data);

 const editUser = (data)=> axiosInstance.post('user/edit',data);


 export default {
   createUser,
   editUser
  };
  