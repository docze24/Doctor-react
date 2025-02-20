import axiosInstance from './axiosInstance';
 //const createUser = (data)=> axiosInstance.post('user/create',data);
 //const editUser = (data)=> axiosInstance.post('user/edit',data);
 //const getUsers = (data)=> axiosInstance.get('doctor-user',data);

 const getUsers = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`doctor-user?${queryString}`);
  };
 export default {
    getUsers,
   
  };
  