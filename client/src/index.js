import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Manage from './routes/manage';
import Admin from './routes/admin';
import Login from './routes/login';
import Home from './routes/home';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<App />}>
      <Route
        index
        element={ 
          <Home style={{ padding: "1rem" }}>
      
      
          </Home>
        }
      />
        <Route path="manage" element={<Manage />}/>
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route
        index
        element={ 
          <Home style={{ padding: "1rem" }}>
      
      
          </Home>
        }
      />
      </Route>
      
    </Routes>
    
  </BrowserRouter>
  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
