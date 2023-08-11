import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from '../actions/Login';
import { useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import { SubmissionError } from 'redux-form';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleSubmit = async (values) => {
        try {
            const response = await dispatch(login({ email: values.email, password: values.password }));
            
            if (!(response && response.token)) {
                throw new SubmissionError({
                    _error: 'Invalid email or password'
                });
            }
        } catch (error) {
            throw new SubmissionError({
                _error: 'Email or Password is not correct!'
            });
        }
    };

    return (
        <div className="auth-form-container">
            <h2> Login </h2>
            <LoginForm onSubmit={handleSubmit} />
            <button className="link-btn" onClick={() => navigate("/register")}>
                Don't have an account? Register here.
            </button>
        </div>
    );
};

export default Login;
