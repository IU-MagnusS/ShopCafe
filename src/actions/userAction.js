import api from './api';

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

    if (response.data.success) {
      dispatch(fetchAllUsers());
    }
    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};
