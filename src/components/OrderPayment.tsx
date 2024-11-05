import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getCartByID } from "../service/cart";
import { CartItem } from "../interface/cart";
import { NavLink } from "react-router-dom";


function OrderPayment() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
 const [user, setUser] = useState<{
    info: { role: string; email: string; id: string };
    id: string;
  } | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const { id } = JSON.parse(userData);
      setUser(id);
      fetchCartData(id);
    }
  }, []);

  const fetchCartData = async (userId: string) => {
    try {
      const data = await getCartByID(userId);
      if (data) {
        setCartItems(data.items);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return (
    <>
    <Header/>
    <div className="flex py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Thông tin nhận hàng</h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
           
            className="w-full border rounded-lg p-3"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại (tùy chọn)"
           
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ (tùy chọn)"
            
            className="w-full border rounded-lg p-3"
          />

          {/* Dropdowns for city, district, and ward */}
          <select
            name="city"
           
            className="w-full border rounded-lg p-3"
          >
            <option value="">Tỉnh thành</option>
            {/* Add options for cities */}
          </select>

          <select
            name="district"
           
            className="w-full border rounded-lg p-3"
          >
            <option value="">Quận huyện (tùy chọn)</option>
            {/* Add options for districts */}
          </select>

          <select
            name="ward"
           
            className="w-full border rounded-lg p-3"
          >
            <option value="">Phường xã (tùy chọn)</option>
            {/* Add options for wards */}
          </select>

          <textarea
            name="notes"
            placeholder="Ghi chú (tùy chọn)"
           
            className="w-full border rounded-lg p-3"
          ></textarea>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Giỏ hàng ({cartItems.length} sản phẩm)</h2>

        {/* Cart Items Display */}
        {cartItems.map((item) => (
          <div key={item.productId} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 rounded-md mr-4"
              />
              <span>{item.name}</span>
            </div>
            <span className="font-semibold">{item.price}₫ x {item.quantity}</span>
          </div>
        ))}

        {/* Total Calculation */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng cộng</span>
            <span>
              {cartItems.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 1), 0)}₫
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-between items-center">
          <NavLink to={`/Cart/${user?.id}`} className="text-blue-500">Quay về giỏ hàng</NavLink>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">ĐẶT HÀNG</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default OrderPayment;
