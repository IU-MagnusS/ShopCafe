import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth"; 

export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout());
      navigate("/");
    };
  
    return (
      <div>
        <h2>Welcome to the Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };
  