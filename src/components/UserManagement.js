import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, updateUserStatus } from '../actions/userAction';

const UserManagement = ({ users, fetchAllUsers, updateUserStatus }) => {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

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
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer?.userList,
});

const mapDispatchToProps = {
  fetchAllUsers,
  updateUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
