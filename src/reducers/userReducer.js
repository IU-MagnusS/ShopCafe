
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
            status: action.payload.newStatus,
            name: action.payload.newName, 
            email: action.payload.newEmail, 
            contactNumber: action.payload.newcontactNumber,
          };
        }
        return user;
      });
      return {
        ...state,
        userList: updatedUserList,
      };
      case 'CREATE_USER_SUCCESS':
        const newUser = {
          ...action.payload.newUser,
          role: 'admin',
          status: true,
        };
        return {
          ...state,
          userList: [...state.userList, newUser],
        };
      


    default:
      return state;
  }
};

export default userReducer;
