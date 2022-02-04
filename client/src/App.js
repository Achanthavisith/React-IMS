import React, { Component } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import UserLogin from './Components/UserLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand } from 'react-bootstrap'

const navbarLinks = {
  padding: 20,
  fontSize: 18,
  textAlign: 'center',
  textDecoration: "none",
  color: 'white',
}

const navbar = {
  borderBottom: '2px solid #2F4F4F',
  font: '15px arial',
  backgroundColor: '#D2691E',
  margin: 0,
  padding: 10,
}

const app = {
}


function App() {
  return (
    <div style = {app}>
      <div style={navbar}>
          <Navbar sticky="top">
            <NavbarBrand href='/'>Inventory Manager</NavbarBrand>
            <Link to="/home" style={navbarLinks}>Home</Link>
            <Link to="/about" style={navbarLinks}>About</Link>
          </Navbar>
      </div>
      <Outlet />
      <UserLogin />
    </div>
  );
}

export default App;