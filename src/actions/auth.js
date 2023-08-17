import api from './api';

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const loginSuccess = (token) => {

    return {
        type: LOGIN_SUCCESS,
        payload: { token }
    };
};

const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const login = ({ email, password }) => async (dispatch) => {
    try {
        const response = await api.post('/user/login', {
            email,
            password
        });

        dispatch(loginSuccess(response.data.token));
        console.log(response);
    } catch (error) {
        dispatch(loginFailure(error));
    }
};

export const logout = () => async (dispatch) => {
 
    dispatch({
        type: LOGOUT,
        payload: { token: null }
    });
};
