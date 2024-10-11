import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './layout/Home';
import Admin from './layout/Admin';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

  








<Route path='/admin' element={<Admin/>} />

    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
