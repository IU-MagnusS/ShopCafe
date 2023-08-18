import api from './api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const setUserList = (userList) => ({
  type: 'SET_USER_LIST',
  payload: userList,
});

export const fetchAllUsers = () => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;
    console.log("authToken:", token);
    const response = await api.get('/user/get', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    dispatch(setUserList(response.data));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateUserStatus = (id, newStatus) => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;
    const requestBody = {
      id: id.toString(),
      status: newStatus,
    };

    const response = await api.post('/user/update', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      setTimeout(() => {
        dispatch(fetchAllUsers());
        toast.success('User status updated successfully');
      }, 1000);
    } else {
      toast.error('Failed to update user status');
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    toast.error('An error occurred while updating user status');
  }
};

export const createUser = (userData) => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;
    const response = await api.post('/user/signup', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      setTimeout(() => {
        dispatch(fetchAllUsers());
        toast.success('User created successfully');
      }, 2000); 
    } else {
      toast.error('Failed to create user');
    }
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error('An error occurred while creating user');
  }
};