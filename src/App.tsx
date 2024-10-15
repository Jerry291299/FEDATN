import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./layout/Home";
import Admin from "./layout/Admin";
import Add from "./components/admin/modaladd/add";
import Dashboard from "./components/admin/Dashboard";
import Register from "./components/user/register";
import Update from "./components/admin/modaladd/update";
import Users from "./components/admin/User";
import Listcategory from "./components/admin/listcategory";
import Addcategory from "./components/admin/modaladd/addcategory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<Admin />}>
            <Route path="add" element={<Add />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="Listcategory" element={<Listcategory />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="users" element={<Users />} />
            <Route path="dashboard/update/:id" Component={Update}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
