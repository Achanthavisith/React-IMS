import React, { Component } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Inventory</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;