import React from "react";
import { connect } from 'react-redux'; 
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth"; 

const Dashboard = ({ logout }) => { 

    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate("/");
    };
  
    return (
      <div>
        <h2>Welcome to the Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
};
  
const mapActionsToProps = { logout }; 

export default connect(null, mapActionsToProps)(Dashboard);
