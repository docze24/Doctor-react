import axiosInstance from './axiosInstance';

const createUser = async (data) => {
  try {
    const response = await axiosInstance.post('doctor-user', data);
    return response.data; // You can return or handle the response data here
  } catch (error) {
    console.error('Error creating user:', error.response || error.message);
    throw error; // Optionally re-throw the error to be handled elsewhere
  }
};

 //const editUser = (data)=> axiosInstance.post('user/edit',data);
 //const getUsers = (data)=> axiosInstance.get('doctor-user',data);

 const getUsers = (params) => {
    const queryString = new URLSearchParams(params).toString();
    return axiosInstance.get(`doctor-user?${queryString}`);
  };
 export default {
    getUsers,
    createUser
   
  };
  