
const initialState = {
    token: null,
    error: null
};

// Reducer func
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                token: action.payload.token,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                token: null,
                error: action.payload.error
            };
            case "CLEAR_ERROR":
           return {
               ...state,
               error: null 
           };
        case "LOGOUT":
            return {
                ...state,
                token: null,
                error: null
            };
        default:
            return state;
    }
};

export default authReducer;
