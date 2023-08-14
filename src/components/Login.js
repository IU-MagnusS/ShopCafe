import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'; 
import { login }  from '../actions/auth';
import LoginForm from "./LoginForm";
import { SubmissionError } from 'redux-form';

const Login = ({ login }) => { 
    const navigate = useNavigate();
    
    const handleSubmit = (values) => {
        return login({ email: values.email, password: values.password })
            .then(response => {
                if (!(response && response.token)) {
                    throw new SubmissionError({
                        _error: 'Invalid email or password'
                    });
                }
                
                navigate("/dashboard");
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Email or Password is not correct!'
                });
            });
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

const mapActionsToProps = { login }; 

export default connect(null, mapActionsToProps)(Login);
