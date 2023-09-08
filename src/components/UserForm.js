import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const UserForm = ({ open, onClose, mode, selectedUser, onAdd, onUpdate }) => {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
    <div className="user-list">
      <div className="modal">
        {mode === 'edit' ? (
          <>
            <h2 id="simple-modal-title">Update User</h2>
            <div id="simple-modal-description">
              <EditUserForm editing={true} currentUser={selectedUser} handleUpdate={onUpdate} handleClose={onClose} />
            </div>
          </>
        ) : (
          <>
            <h2 id="simple-modal-title">Create User</h2>
            <div id="simple-modal-description">
              <AddUserForm handleAdd={onAdd} handleClose={onClose} />
            </div>
          </>
        )}
      </div>
    </div>
    </Modal>
  );
};

export default UserForm;
