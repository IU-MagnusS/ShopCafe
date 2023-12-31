import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/userAction';
import Button from '@material-ui/core/Button';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@material-ui/icons/Close';

const AddUserForm = ({ createUser, handleClose }) => {
  const [user, setUser] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user.name || !user.contactNumber) {
      console.error('Name and contact number are required');
      return;
    }

    const newUser = {
      name: user.name,
      contactNumber: user.contactNumber,
      email: user.email,
      password: user.password,
      
    };

    createUser(newUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <br />
      <label>Phone:</label>
      <input type="text" name="contactNumber" value={user.contactNumber} onChange={handleInputChange} />
      <br />
      <label>E-mail:</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange} />
      <br />
      <label>Password:</label>
      <input type="password" name="password" value={user.password} onChange={handleInputChange} />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        style={{ marginRight: '10px' }}
        onClick={handleSubmit}
      >
        Save & Change
      </Button>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<CloseIcon />}
        onClick={handleClose}
      >
        Exit
      </Button>

    </form>
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer.userList,
});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
