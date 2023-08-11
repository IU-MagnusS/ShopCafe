import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import Login  from "../actions/Login"; 
import { Register } from "../Register";
import { Dashboard } from "./Dashboard";

const PrivateRoute = ({ element: Element, auth }) => {
  return auth.token ? <Element /> : <Navigate to="/" />;
};


export default function App({ authReducer }) {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={ !authReducer.token ? <Login /> : <Dashboard />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} auth={authReducer} />} />
   
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}


