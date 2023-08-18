import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../actions/userAction';

const UserManagement = ({ users, fetchAllUsers }) => {
  useEffect(() => {
    fetchAllUsers();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => ( // map lap qua danh sach nguoi dung hien thi trong arr
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactNumber}</td>
              <td>{user.status ? 'Active' : 'Inactive'}</td>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
