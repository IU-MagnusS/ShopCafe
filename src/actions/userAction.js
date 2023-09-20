import api from './api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const createUserSuccess = (newUser) => ({
  type: 'CREATE_USER_SUCCESS',
  payload: newUser,
});

export const deleteUserSuccess = (deletedUserId) => ({
  type: 'DELETE_USER_SUCCESS',
  payload: deletedUserId,
});

export const deleteUserFailure = (error) => ({
  type: 'DELETE_USER_FAILURE',
  payload: error,
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
    if (response.status === 200) {
      dispatch({
        type: 'SET_USER_LIST',
        payload: response.data,
      });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export const updateUserStatus = (id, updatedUser) => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;

    const response = await api.post('/user/update', updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: response.data,
      });
      toast.success('User status updated successfully');
      await dispatch(fetchAllUsers());
    } else {
      toast.error('Failed to update user status');
    }
  } catch (error) {
    toast.error('An error occurred while updating user status');
  }
};


export const createUser = (userData, isAdmin = false) => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;
    const role = isAdmin ? 'user' : 'admin';
    const status = isAdmin ? false : true;
    const userDataWithRoleAndStatus = { 
      ...userData,
       role, 
       status
       };

    const response = await api.post('/user/signup', userDataWithRoleAndStatus, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(createUserSuccess(response.data));
      toast.success('Create new user successfully')
    } else {
      toast.error('Failed to create user');
    }
  } catch (error) {
    toast.error('An error occurred while creating user');
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const { token } = getState().authReducer;
    const response = await api.delete(`/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      dispatch(deleteUserSuccess(userId));
    } else {
      dispatch(deleteUserFailure('Failed to delete user'));
    }
  } catch (error) {
    dispatch(deleteUserFailure('An error occurred while deleting user'));
  }
};
