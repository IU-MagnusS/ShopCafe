import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, updateUserStatus, createUser } from '../actions/userAction';


const CreateUser = ({ createUser , flagSuccess}) => {
  const [objCreate, setObjCreate] = useState({})


  const handleSubmit = () => {
    if (flagSuccess) {
      return
    }
    const newUser = {
      name: objCreate.name,
      contactNumber: objCreate.contactNumber,
      email: objCreate.email,
      password:objCreate.password,
      status: 'false',
      role: 'user',
    };
    createUser(newUser);
  };

  const handleChangeInput = (nameInput, value) => {
    setObjCreate({...objCreate, [nameInput] : value})
  }
  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={objCreate.name} onChange={(e) => handleChangeInput("name", e.target.value)} />

        <label>Contact Number:</label>
        <input type="text" value={objCreate.contactNumber} onChange={(e) => handleChangeInput("contactNumber", e.target.value)} />

        <label>Email:</label>
        <input type="email" value={objCreate.email} onChange={(e) => handleChangeInput("email", e.target.value)} />

        <label>Password:</label>
        <input type="password" value={objCreate.password} onChange={(e) => handleChangeInput("password", e.target.value)}  />

        <button type="submit" onClick={handleSubmit}>Create User</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.userReducer.userList,
  flagSuccess: state.userReducer.flagSuccess,
});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);