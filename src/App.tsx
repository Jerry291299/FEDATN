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
import Login from "./components/user/login";
import Updatecategory from "./components/admin/modaladd/updatecategory";
import Productspage from "./components/Productspage";
import  ProductDetail  from "./components/ProductDetail";
import Privaterouter from "./components/privaterouter";
import Cart from "./components/cart/cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/products" element={<Productspage />}/>
          <Route path="/cart/:id" element={<Privaterouter><Cart/></Privaterouter>}></Route>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={<Privaterouter><Admin/></Privaterouter>}>
            <Route path="add" element={<Add />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="Listcategory" element={<Listcategory />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="users" element={<Users />} />
            <Route path="dashboard/update/:id" Component={Update}></Route>
            <Route path="Listcategory/updatecategory/:id" Component={Updatecategory}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
