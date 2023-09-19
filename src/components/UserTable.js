import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useDispatch } from 'react-redux'; // Import useDispatch từ Redux
import { deleteUser } from '../actions/userAction'; // Import action creator để xóa người dùng
import { Toolbar, IconButton, Tooltip } from '@mui/material'; // Import các thành phần Material-UI cần thiết
import DeleteIcon from '@mui/icons-material/Delete';

const UserTable = ({ userList, onEdit }) => {
  const dispatch = useDispatch(); // Sử dụng useDispatch để gọi action

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
        onHandleDelete={() => handleDelete(selectedRows)}
      />
    ),
  };

  const handleDelete = (selectedRows) => {
    if (selectedRows.data.length === 0) {
      return;
    }

    const selectedUserIds = selectedRows.data.map(
      (row) => userList[row.dataIndex].id
    );

    // Gọi action creator để xóa người dùng
    selectedUserIds.forEach((userId) => {
      dispatch(deleteUser(userId));
    });
  };

  const CustomToolbarDelete = ({ selectedRows, onHandleDelete }) => {
    return (
      <Toolbar>
        <Tooltip title={'Delete'}>
          <IconButton onClick={onHandleDelete}>
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

export default UserTable;
