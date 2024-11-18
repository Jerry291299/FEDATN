import React from "react";
import PlacedOrders from "./PlacedOrders";

const Order = () => {
  // Dữ liệu mẫu cho bảng
  const orders = [
    {
      id: "DH125894",
      date: "15/11/2024",
      amount: "9,015,500đ",
      paymentStatus: "Đang chờ xử lý",
      shippingStatus: "Chưa giao hàng",

    },
    {
      id: "DH125895",
      date: "14/11/2024",
      amount: "5,500,000đ",
      paymentStatus: "Đã thanh toán",
      shippingStatus: "Đang vận chuyển",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      
      <h2 className="text-xl font-semibold mb-4">DANH SÁCH ĐƠN HÀNG MỚI NHẤT</h2>

   
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Mã đơn hàng</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Ngày đặt</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Thành tiền</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Trạng thái thanh toán</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Vận chuyển</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">{order.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{order.paymentStatus}</td>
                <td className="border border-gray-300 px-4 py-2">{order.shippingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Order;