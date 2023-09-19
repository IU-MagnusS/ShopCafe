
const initialState = {
  userList: [],
  isCreateSuccess: false,
  isUpdateSuccess: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        isCreateSuccess: true,
      };
    case 'SET_USER_LIST':
      return {
        ...state,
        userList: action.payload,
      };
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        isUpdateSuccess: true,
      };
    case 'DELETE_USER_SUCCESS':
      const deletedUserId = action.payload;
      const updatedUserList = state.userList.filter((user) => user.id !== deletedUserId);
      return {
        ...state,
        userList: updatedUserList,
      };
    default:
      return state;
  }
};

export default userReducer;
