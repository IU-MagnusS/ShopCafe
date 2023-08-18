
const initialState = {
  userList: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_LIST':
      return {
        ...state,
        userList: action.payload,
      };
    case 'UPDATE_USER_STATUS_SUCCESS':
      const updatedUserList = state.userList.map(user => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            status: action.payload.newStatus
          };
        }
        return user;
      });
      return {
        ...state,
        userList: updatedUserList,
      };
    case 'CREATE_USER_SUCCESS':
      return {
        ...state,
        userList: [...state.userList, action.payload.newUser],
      };
    default:
      return state;
  }
};

export default userReducer;
