import React from 'react';
import './App.css';
import { Link, Outlet, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand } from 'react-bootstrap'
import auth from './context/auth'
import PostProducts from './components/PostProducts'

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

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = auth.isAuthenticated();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <div>
      <div style={navbar}>
        <RequireAuth redirectTo='/login'>
        <Navbar sticky="top">
            <NavbarBrand as={Link} to='/'>Inventory Manager</NavbarBrand>
            <Link to="/manage" style={navbarLinks}>Manage</Link>
            <Link to="/admin" style={navbarLinks}>Admin</Link>
        </Navbar>
        </RequireAuth>
      </div>
      <Outlet />
      <div>
      
      </div>
    </div>
  );
}

export default App;