import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, createUser, updateUserStatus } from '../actions/userAction';
import MUIDataTable from 'mui-datatables';
import Modal from '@material-ui/core/Modal';
import AddUserForm from '../forms/AddUser';
import EditUserForm from '../forms/EditUser';

const UserList = ({ fetchAllUsers, createUser, updateUserStatus, userList }) => {
    const [open, setOpen] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditUser(false);
        setSelectedUser(null);
    };

    // CRUD operations
    const handleAdd = (user) => {
        createUser(user);
        handleClose();
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditUser(true);
        handleOpen();
    };


    const handleUpdate = (id, updatedUser) => {
        console.log('ID:', id);
        updateUserStatus(id, updatedUser);
        handleClose();
    };

    const columns = [
        { name: 'id', label: 'ID', options: { filter: false } },
        { name: 'name', label: 'Name', options: { filter: false } },
        { name: 'contactNumber', label: 'Phone', options: { filter: false } },
        { name: 'email', label: 'E-mail', options: { filter: false } },
        {
            name: 'Edit',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                            onClick={() => {
                                const rowData = { id: tableMeta.rowData[0], name: tableMeta.rowData[1], contactNumber: tableMeta.rowData[2], email: tableMeta.rowData[3] };
                                handleEdit(rowData);
                            }}
                            className="button muted-button"
                        >   
                            Edit
                        </button>
                    );
                },
            },
        },
    ];
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: ""
    };

    return (
        <div>
            <button type="button" onClick={handleOpen} className="adduser">
                Add User
            </button>

            {userList.length > 0 && (
                <MUIDataTable
                    title={'Data'}
                    data={userList}
                    columns={columns}
                    options={options}

                />
            )}

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className="modal">
                    {editUser ? (
                        <>
                            <h2 id="simple-modal-title">Update User</h2>
                            <div id="simple-modal-description">
                                <EditUserForm editing={editUser} currentUser={selectedUser} handleUpdate={handleUpdate} />
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 id="simple-modal-title">Create User</h2>
                            <div id="simple-modal-description">
                                <AddUserForm handleAdd={handleAdd} />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
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
