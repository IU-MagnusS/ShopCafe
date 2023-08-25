import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateUserStatus } from '../actions/userAction';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

const EditUserForm = ({ currentUser, handleUpdate }) => {
  const [user, setUser] = useState(currentUser);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidEmail(user.email)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    handleUpdate(user.id, user);
    
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    isModalOpen && (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={{ textAlign: "left" }}>Name:</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <br />
        <label htmlFor="contactNumber" style={{ textAlign: "left" }}>Phone:</label>
        <input type="text" name="contactNumber" value={user.contactNumber} onChange={handleInputChange} />
        <br />
        <label htmlFor="email" style={{ textAlign: "left" }}>E-mail:</label>
        <input type="text" name="email" value={user.email} onChange={handleInputChange} />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          style={{ marginRight: "10px" }}
          onClick={handleSubmit}
        >
          Save & Change
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={handleCloseModal}
        >
          Exit
        </Button>
      </form>
    )
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer.userList,
});

const mapDispatchToProps = {
  updateUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
