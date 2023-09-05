import React from 'react';
import MUIDataTable from 'mui-datatables';

const UserTable = ({ userList, onEdit }) => {
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
    filterType: "dropdown",
    responsive: "vertical"
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
