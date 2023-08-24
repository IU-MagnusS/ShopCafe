import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, updateUserStatus, createUser } from '../actions/userAction';
import CreateUser from './CreateUser';


const UserManagement = ({ users, fetchAllUsers, updateUserStatus, createUser, flagSuccess }) => {
  
  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [flagSuccess]);

  const [popupOpen, setPopupOpen] = useState(false);

  const handleUpdateStatus = (id, newStatus) => {
    updateUserStatus(id, newStatus);
  };

  
  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>{user.status === 'true' ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleUpdateStatus(user.id, user.status === 'true' ? 'false' : 'true')}>
                  {user.status === 'true' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPopupOpen(true)}>Create User</button>
      {popupOpen && !flagSuccess && <CreateUser />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer.userList,
  flagSuccess: state.userReducer.flagSuccess,
});

const mapDispatchToProps = {
  fetchAllUsers,
  updateUserStatus,
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
