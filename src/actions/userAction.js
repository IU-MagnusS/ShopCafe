import api from './api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    dispatch({
      type: 'SET_USER_LIST',
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const updateUserStatus = (id, newStatus, newName, newEmail, newcontactNumber) => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;
    const requestBody = {
      id: id.toString(),
      status: newStatus,
      name: newName,
      email: newEmail,
      contactNumber: newcontactNumber,
    };

    const response = await api.post('/user/update', requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch({
        type: "UPDATE_USER_STATUS",
        payload: {
          id,
          newStatus,
          newName,
          newEmail,
          newcontactNumber,
        }
      });
      toast.success('User status updated successfully');
      dispatch(fetchAllUsers());
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

    if (response.status === 200) {
      dispatch({
        type: "CREATE_USER_SUCCESS",
        payload: response.data
      });
      toast.success('User created successfully');
      dispatch(fetchAllUsers());
      
    } else {
      toast.error('Failed to create user');
    
    }
    return response.data;
  } catch (error) {
    toast.error('An error occurred while creating user');
  }
};
