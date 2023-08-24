import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, updateUserStatus, createUser } from '../actions/userAction';
import AddUserForm from '../forms/AddUser';
import EditUserForm from '../forms/EditUser';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Modal } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const UserList = function(props) {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [array, setArray] = useState([]);
    const [arrayEdit, setArrayEdit] = useState({});
    const [dataToDisplay, setDataToDisplay] = useState([]);

    useEffect(() => {
        props.fetchAllUsers();
    }, []);

    useEffect(() => {
        // Kiểm tra nếu danh sách người dùng đã được fetch thành công trước khi cập nhật state.
        if (props.userList.length > 0) {
            setDataToDisplay(props.userList);
        }
    }, [props.userList]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // CRUD operations
    const addUser = (user) => {
        user.id = dataToDisplay.length + 1;
        const newUser = [user.id, user.name, user.contactNumber, user.email, user.password, ''];
        setDataToDisplay([...dataToDisplay, newUser]);
        handleClose();
    };

    const addButton = () => {
        setEdit(false);
        handleOpen();
    };

    const deleteUser = (id) => {
        setEdit(false);
        const newData = dataToDisplay.filter((user) => user[0] !== id);
        setDataToDisplay(newData);
    };

    const updateUser = (id, updatedUser) => {
       
        const editedUser = [updatedUser.id, updatedUser.name, updatedUser.contactNumber, updatedUser.email, ''];
        const updatedData = dataToDisplay.map((user) => (user[0] === id ? editedUser : user));
        setDataToDisplay(updatedData);
        handleClose();
    };

    const editButton = (user) => {
        setEdit(true);
        setArrayEdit({ id: user[0], name: user[1], contactNumber: user[2], email: user[3], acao: '' });
        handleOpen();
    };

    const tableOptions = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'vertical',
    };

    const columns = [
        { name: 'id', label: 'ID' },
        { name: 'name', label: 'Name' },
        { name: 'contactNumber', label: 'Phone' },
        { name: 'email', label: 'E-mail' },
        {
            name: 'Edit',
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                            onClick={() => {
                                editButton(tableMeta.rowData);
                            }}
                            className="button muted-button" >
                            Edit
                        </button>
                    );
                },
            },
        },
    ];

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        ReactJS App
                    </Typography>
                </Toolbar>
            </AppBar>

            <button type="button" className="button" onClick={() => addButton()}>
                Add User
            </button>

            {/* Kiểm tra nếu dữ liệu đã sẵn sàng trước khi render table */}
            {dataToDisplay.length > 0 && (
                <MUIDataTable title={'Data'} data={dataToDisplay} columns={columns} options={tableOptions} />
            )}

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className="modal">
                    {edit ? (
                        <Fragment>
                            <h2 id="simple-modal-title">Update User</h2>
                            <div id="simple-modal-description">
                                <EditUserForm editing={edit} currentUser={arrayEdit} updateUser={updateUser} />
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h2 id="simple-modal-title">Create User</h2>
                            <div id="simple-modal-description">
                                <AddUserForm addUser={addUser} />
                            </div>
                        </Fragment>
                    )}
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userList: state.userReducer.userList,
    flagSuccess: state.userReducer.flagSuccess,
});

const mapDispatchToProps = {
    fetchAllUsers,
    updateUserStatus,
    createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
