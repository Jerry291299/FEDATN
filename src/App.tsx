import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
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
import ProductDetail from "./components/ProductDetail";
import Privaterouter from "./components/privaterouter";
import Cart from "./components/cart/cart";
import Tintuc from "./components/tintuc";
import Tintucdetail from "./components/tintucdetail";
import Gioithieu from "./components/gioithieu";
import SearchResults from "./components/SearchResults";
import OrderPayment from "./components/OrderPayment";
import CategorisPage from "./components/CategorisPage";
import Order from "./components/admin/Orderadmin";
import Success from "./components/success";
import Donhangpage from "./components/Donhangpage";
import ListMaterial from "./components/admin/Material";
import AddMaterial from "./components/admin/modaladd/addmaterial";
import { updateMaterial } from "./service/material";
import UpdateMaterial from "./components/admin/modaladd/updatemaerial";
import OrderList from "./components/OrderList";
import Donhang from "./components/Order";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories/:id" element={<CategorisPage />} />
          
          <Route path="/products" element={<Productspage />} />
          <Route path="/products/categories/:id" element={<Productspage />} />
          <Route path="/search/:searchTerm" element={<SearchResults />} />
          <Route
            path="/Cart/:id"
            element={
              <Privaterouter>
                <Cart />
              </Privaterouter>
            }
          ></Route>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tintuc" element={<Tintuc />} />
          <Route path="/tintuc/:id" element={<Tintucdetail />} />
          <Route path="/gioithieu" element={<Gioithieu />} />
          <Route path="/order" element={<OrderPayment />} />
          <Route path="/donhang" element={<Donhang/>} />
          <Route path="/success" element={<Success />} />
          <Route path="/listdonhang" element={<Donhangpage />} />
          <Route
            path="/admin"
            element={
              <Privaterouter>
                <Admin />
              </Privaterouter>
            }
          >
            <Route path="add" element={<Add />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="Listcategory" element={<Listcategory />} />
            <Route path="addcategory" element={<Addcategory />} />
            <Route path="Material" element={<ListMaterial />} />
            <Route path="addMaterial" element={<AddMaterial />} />
            <Route path="users" element={<Users />} />
            <Route path="order" element={<Order />} />
            <Route path="dashboard/update/:id" Component={Update}></Route>
            
            <Route
              path="Listcategory/updatecategory/:id"
              Component={Updatecategory}
            ></Route>
            <Route
              path="Material/updateMaterial/:id"
              Component={UpdateMaterial}
            ></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
