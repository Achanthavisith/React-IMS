import React, { useState } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand } from 'react-bootstrap'
import './Components/ImageBackgroundHeader'
import ImageBackgroundHeader from './Components/ImageBackgroundHeader';
import AddProductsInputs from './Components/AddProductsInput';
import DisplayProduct from './Components/DisplayProducts';

const navbarLinks = {
  padding: 20,
  fontSize: 18,
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

function App() {
  return (
    <body>
    
    <div>
      <div style={navbar}>
          <Navbar sticky="top">
            <NavbarBrand href='/'>Inventory Manager</NavbarBrand>
            <Link to="/home" style={navbarLinks}>Placeholder</Link>
            <Link to="/about" style={navbarLinks}>placeholder</Link>
            <Link to="/login" style={navbarLinks}>Login</Link>
          </Navbar>
        
      </div>
      <ImageBackgroundHeader></ImageBackgroundHeader>
      <AddProductsInputs></AddProductsInputs>
      <Outlet />
    </div>
    </body>
  );
}

export default App;