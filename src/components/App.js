import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import Login  from "../actions/Login"; 
import { Register } from "../Register";
import { Dashboard } from "./Dashboard";

export default function App({ authReducer }) {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={ !authReducer.token ? <Login /> : <Dashboard />} />
    
   
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}


