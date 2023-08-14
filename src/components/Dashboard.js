import React from "react";
import { connect } from 'react-redux'; 
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth"; 

const Dashboard = ({ logout }) => { // Correctly destructure the logout prop

    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout(); // Call the logout action
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
