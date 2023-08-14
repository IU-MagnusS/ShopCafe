import React from "react";
import { connect } from 'react-redux'; 
import { logout } from "../actions/auth"; 
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Dashboard = ({ logout }) => { 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      logout();
      handleClose();
    };
  
    return (
      <div>
        <Button
          id="dashboard-menu-button"
          aria-controls={open ? 'dashboard-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu
          id="dashboard-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'dashboard-menu-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
};

const mapActionsToProps = { logout }; 

export default connect(null, mapActionsToProps)(Dashboard);
