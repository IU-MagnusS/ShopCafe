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

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const response = await api.put(`/user/update/${id}`, user);
    if (response.data.success) {
      dispatch(fetchAllUsers()); 
    }
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};