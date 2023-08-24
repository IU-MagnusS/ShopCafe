import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserStatus } from '../actions/userAction';
import { toast } from 'react-toastify';

const EditUserForm = ({ updateUserStatus, currentUser, updateUser }) => {
	const [user, setUser] = useState(currentUser);
  
	useEffect(() => {
	  setUser(currentUser);
	}, [currentUser]);
  
	const handleInputChange = event => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};
  
	const handleSubmit = (event) => {
	  event.preventDefault();
	  if (!isValidEmail(user.email)) {
		toast.error("Email không hợp lệ!");
		return;
	  }
	  updateUser(user.id, user);
	  updateUserStatus(user.id, user.status, user.name, user.email, user.contactNumber); 
	};
  
	const isValidEmail = (email) => {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(email);
	};
  
	return (
		<form onSubmit={handleSubmit}>
		<label>Name:</label>
		<input type="text" name="name" value={user.name} onChange={handleInputChange} /><br />
		<label>Phone:</label>
		<input type="text" name="contactNumber" value={user.contactNumber} onChange={handleInputChange} /><br />
		<label>E-mail:</label>
		<input type="text" name="email" value={user.email} onChange={handleInputChange} /><br /><br />
		<button>Save & Change</button>
	  </form>
	);
};

const mapStateToProps = (state) => ({
	users: state.userReducer.userList,
});

const mapDispatchToProps = {
  updateUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
