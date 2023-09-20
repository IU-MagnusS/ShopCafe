import React from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/userAction';
import { Toolbar, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable = ({ userList, onEdit, deleteUser }) => {
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
                const rowData = {
                  id: tableMeta.rowData[0],
                  name: tableMeta.rowData[1],
                  contactNumber: tableMeta.rowData[2],
                  email: tableMeta.rowData[3],
                };
                onEdit(rowData);
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
    filterType: 'dropdown',
    responsive: 'vertical',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbarDelete
        selectedRows={selectedRows}
        onDelete={deleteSelectedUsers}
      />
    ),
  };

  const deleteSelectedUsers = (selectedRows) => {
    if (selectedRows.data.length === 0) {
      return;
    }

    const selectedUserIds = selectedRows.data.map(
      (row) => userList[row.dataIndex].id
    );

    selectedUserIds.forEach((userId) => {
      deleteUser(userId);
    });
  };

  const CustomToolbarDelete = ({ selectedRows, onDelete }) => {
    return (
      <Toolbar>
        <Tooltip title={'Delete'}>
          <IconButton onClick={() => onDelete(selectedRows)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    );
  };

  return (
    <MUIDataTable
      title={'Data'}
      data={userList}
      columns={columns}
      options={options}
    />
  );
};

const mapStateToProps = (state) => ({
  userList: state.userReducer.userList,
});

const mapDispatchToProps = {
  deleteUser, 
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
