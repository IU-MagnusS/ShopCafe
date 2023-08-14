import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Validate function
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
};

// Render field component
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label className="control-label">{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control" />
            {touched && (
                <div className="invalid-feedback">
                    {error && <span className="text-danger">{error}</span>}
                    {warning && <span>{warning}</span>}
                </div>
            )}
        </div>
    </div>
);

// Redux Form Component
let LoginForm = props => {
    const { handleSubmit, error } = props; 
    
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>} {/* Display the error message */}
            <div className="form-group">
                <Field name="email" component={renderField} label="Email" />
            </div>
            <div className="form-group">
                <Field name="password" component={renderField} label="Password" type="password" />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">Log In</button>
            </div>
        </form>
    );
};

LoginForm = reduxForm({
    form: 'loginForm', // A unique identifier for this form
    validate
})(LoginForm);

export default LoginForm;
