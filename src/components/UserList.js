import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, createUser, updateUserStatus } from '../actions/userAction';
import UserTable from './UserTable';
import UserForm from './UserForm';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import './forms/UserList.css';

function validateUserData(user) {
    return user.name && user.name.trim() !== '';
}

const UserList = ({ fetchAllUsers, createUser, updateUserStatus, userList, isCreateSuccess, isUpdateSuccess }) => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
        if (isCreateSuccess || isUpdateSuccess) {
            handleClose();
        }
    }, [isCreateSuccess, isUpdateSuccess]);

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

    const handleAdd = useCallback(
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

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    return (
        <div className="user-list">
            <div className="home-button">
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    onClick={handleHomeClick}
                >
                    <HomeIcon />
                </IconButton>
            </div>
            <button type="button" onClick={() => handleOpen('add')} className="button">
                New User
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
    isCreateSuccess: state.userReducer.isCreateSuccess,
    isUpdateSuccess: state.userReducer.isUpdateSuccess,
});

const mapDispatchToProps = {
    fetchAllUsers,
    createUser,
    updateUserStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
