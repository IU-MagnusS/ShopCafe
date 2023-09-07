import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from "react-redux";

import Login  from "./components/Login";
import Dashboard  from "./components/Dashboard";
import UserList from "./components/UserList";
import Register from "./components/Register";

const PrivateRoute = ({ element: Element, auth }) => {
  return auth.token ? <Element /> : <Navigate to="/" />;
};

const App = ({ authReducer }) => {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={!authReducer.token ? <Login /> : <Dashboard />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} auth={authReducer} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/data" 
            element={<PrivateRoute element={UserList} auth={authReducer} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};


const mapStateToProps = state => ({
  authReducer: state.authReducer
});

export default connect(mapStateToProps)(App);
