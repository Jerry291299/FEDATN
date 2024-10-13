import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './layout/Home';
import Admin from './layout/Admin';
import Add from './components/admin/add';
import Dashboard from './components/admin/Dashboard';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

  








<Route path='/admin' element={<Admin/>} >
<Route path='add' element={<Add/>} />
<Route path='dashboard' element={<Dashboard/>} />


</Route>

    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
