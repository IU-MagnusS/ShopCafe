import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, createUser, updateUserStatus } from '../actions/userAction';
import UserTable from './UserTable';
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import './forms/UserList.css';

function validateUserData(user) {
    return user.name && user.name.trim() !== '';
}

const UserList = ({ fetchAllUsers, createUser, updateUserStatus, userList }) => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const handleOpen = (action, user) => {
        setOpen(true);
        if (action === 'edit') {
            setSelectedUser(user);
        } else {
            setSelectedUser(null);
        }
    };
    
    

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleAdd = useCallback(  // store func between render, return a stored version of callback func only changes when one of the dependencies changes 
        async (user) => {
            if (validateUserData(user)) {
                try {
                    await createUser(user);
                    handleClose();
                } catch (error) {
                    toast.error('Error Adding User');
                }
            } else {
                toast.error('Please enter a valid name');
            }
        },
        [createUser]
    );

    const handleEdit = useCallback(
        (user) => {
            handleOpen('edit', user);
        },
        [handleOpen]
    );


    const handleUpdate = useCallback(
        async (id, updatedUser) => {
            if (validateUserData(updatedUser)) {
                try {
                    await updateUserStatus(id, updatedUser);
                    handleClose();
                } catch (error) {
                    toast.error('Error Updating User');
                }
            } else {
                toast.error('Please enter a valid name');
            }
        },
        [updateUserStatus]
    );

    return (
        <div className="user-list">
            <button type="button" onClick={() => handleOpen('add')} className="button">
                Add User
            </button>

            {userList.length > 0 && <UserTable userList={userList} onEdit={handleEdit} />}

            <UserForm
                open={open}
                onClose={handleClose}
                mode={selectedUser ? 'edit' : 'add'}
                selectedUser={selectedUser}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
            />

        </div>
    );
};

const mapStateToProps = (state) => ({
    userList: state.userReducer.userList,
});

const mapDispatchToProps = {
    fetchAllUsers,
    createUser,
    updateUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
