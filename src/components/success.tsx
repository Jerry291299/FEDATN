import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IOrderData } from "../service/order";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData as IOrderData;

  // Kiểm tra nếu `orderData` không tồn tại, điều hướng về trang chủ hoặc hiển thị thông báo
  if (!orderData) {
    navigate('/');
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4 lg:p-8 bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl w-full">
          <p className="text-sm">
            Cảm ơn bạn đã mua sắm tại Beautifullhouse
            
          </p>
          <p className="text-sm mt-2">
            Tổng giá trị là{" "}
            <span className="font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(orderData.totalAmount)}
            </span>
            , dự kiến giao hàng trong vòng 2-7 ngày đối với hàng có sẵn tại khu
            vực. Cần thêm thông tin Quý khách vui lòng liên hệ Hotline:{" "}
            <span className="font-bold">18007020</span>
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <NavLink to="/products">
            <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-100">
              Tiếp tục mua hàng
            </button>
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-4xl w-full">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Chi tiết đơn hàng</h2>
            {orderData.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b border-gray-300 pb-4 mb-4">
                <img src={item?.img[0]} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <p className="font-semibold">{item.name} x {item.quantity}</p>
                  <p className="text-gray-500 font-medium">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </p>
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Thành tiền:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(orderData.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Phương thức thanh toán:</span>
                <span className="font-medium">{orderData.paymentMethod === "bank_transfer" ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
