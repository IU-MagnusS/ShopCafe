import api from './api';

const loginSuccess = (token) => {

    return {
        type: "LOGIN_SUCCESS",
        payload: { token }
    };
};

const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: { error }
});

const clearErr = () => ({
    type: "CLEAR_ERROR"
 });

export const login = ({ email, password }) => async (dispatch) => {
    try {
        const response = await api.post('/user/login', {
            email,
            password
        });

        dispatch(loginSuccess(response.data.token));
        dispatch(clearErr());
        console.log(response);
    } catch (error) {
        dispatch(loginFailure("Invalid email or password"));
    }
};

export const logout = () => async (dispatch) => {
 
    dispatch({
        type: "LOGOUT",
        payload: { token: null }
    });
};
