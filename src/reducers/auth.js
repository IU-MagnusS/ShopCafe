import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT = "auth/LOGOUT";

const initialState = {
    token: null
};

//Reducer func
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token
            };
        case LOGOUT:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
};


const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: { token }
});

/*const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
        }
    }
});*/



export const login = ({email, password}) => async dispatch => {
    const res = await axios.post('http://localhost:3000/user/login', { 
        email, 
        password
    });
    dispatch(loginSuccess(res.data.token));
};

export const logout = () => ({
    type: LOGOUT
});

export default authReducer;