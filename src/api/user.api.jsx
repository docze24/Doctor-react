import axiosInstance from './axiosInstance';


const createUser = (data) => axiosInstance.post('/doctor-user', data);

const editUser = (data) => axiosInstance.put(`/doctor-user/${data.userId}`, data);

const getUserById = (userId) => axiosInstance.get(`/doctor-user/${userId}`);

 const getUsers = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`doctor-user?${queryString}`);
  };

 export default {
    getUsers,
    createUser,
    editUser,
    getUserById
   
  };
  