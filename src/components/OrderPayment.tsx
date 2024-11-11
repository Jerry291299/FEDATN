import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getCartByID } from "../service/cart";
import { CartItem } from "../interface/cart";
import { NavLink } from "react-router-dom";


function OrderPayment() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
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

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <>
    <Header/>

        <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-gray-100">
        {/* Left Column */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Địa chỉ giao hàng</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Họ và tên *</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập họ tên" />
              </div>
              <div>
                <label className="block text-sm font-medium">Số điện thoại *</label>
                <input type="tel" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập số điện thoại" />
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Địa chỉ email *</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập email" />
              </div>
              <div>
                <label className="block text-sm font-medium">Địa chỉ *</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập địa chỉ" />
              </div>
            </div>
  
            
  
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Create an account?</span>
              </label>
            </div>
  
            <div className="mt-4">
              <h3 className="text-lg font-bold">Thông tin thêm</h3>
              <textarea className="mt-2 block w-full border border-gray-300 p-2 rounded-md" rows={4} placeholder="Lưu ý cho đơn hàng"></textarea>
            </div>
          </form>
  
          <h2 className="text-lg font-bold mt-8">Phương thức thanh toán</h2>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handlePaymentMethodChange("bank_transfer")}
              className={`w-full border p-4 rounded-md flex items-center justify-center ${
                selectedPaymentMethod === "bank_transfer"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-lg font-medium">Chuyển khoản ngân hàng</span>
            </button>
            <button
              onClick={() => handlePaymentMethodChange("cash_on_delivery")}
              className={`w-full border p-4 rounded-md flex items-center justify-center ${
                selectedPaymentMethod === "cash_on_delivery"
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-lg font-medium">Thanh toán khi nhận hàng</span>
            </button>
          </div>

          {selectedPaymentMethod === "bank_transfer" && (
            <div className="mt-4">
              <h3 className="text-sm font-bold">Ngân hàng Vietcombank</h3>
              <p>Số tài khoản: 0071000745809</p>
              <p>Tên chủ tài khoản: CT CP NOI THAT AKA VIETCOMBANK – CHI NHÁNH TP.HCM</p>
            </div>
          )}
        </div>
  
        {/* Right Column */}
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Giỏ hàng ({cartItems.length} sản phẩm)</h2>

       
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

       
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Tổng cộng</span>
            <span>
              {cartItems.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 1), 0)}₫
            </span>
          </div>
        </div>

        
        <div className="mt-6 flex justify-between items-center">
          <NavLink to={`/Cart/${user?.id}`} className="text-blue-500">Quay về giỏ hàng</NavLink>
          <NavLink to={`/donhang`}>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">Xác nhận</button>
          </NavLink>
        </div>
      </div>
      </div>
    <Footer/>
    </>
  );
}

export default OrderPayment;
