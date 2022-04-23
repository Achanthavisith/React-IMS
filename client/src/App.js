import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Link, Outlet} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand } from 'react-bootstrap'
import { UserContext } from './context/context';

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
  const [user, setUser] = useState(null);
    useEffect(() => {
      const currentUser = localStorage.getItem("user");
      setUser(JSON.parse(currentUser));
    },[]);

  const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);


  return (
    <div>
      <div style={navbar}>
        <Navbar sticky="top">
            <NavbarBrand as={Link} to='/'>Inventory Manager</NavbarBrand>
            <Link to="/manage" style={navbarLinks}>Manage</Link>
            <Link to="/admin" style={navbarLinks}>Admin</Link>
            <Link to="/login" style={navbarLinks}>Login/Logout</Link>
        </Navbar>
      </div>
      <UserContext.Provider value={providerValue}>
        <Outlet />
      </UserContext.Provider>
      <div>
      
      </div>
    </div>
  );
}

export default App;