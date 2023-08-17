import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../actions/userAction';

const UserManagement = ({ users, fetchAllUsers }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUpdateUser = (id, newData) => {
    fetchAllUsers();
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
          {userList && userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleUpdateUser(user.id, { name: 'New Name' })}>
                  Update
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
  users: state.user?.userList,
});

const mapDispatchToProps = {
  fetchAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);