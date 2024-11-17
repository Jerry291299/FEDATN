import React, { useState } from "react";

const Order = () => {
  // Quản lý danh sách đơn hàng
  const [processingOrders, setProcessingOrders] = useState([
    { id: 1, name: "Đơn hàng 001", date: "2024-11-17" },
    { id: 2, name: "Đơn hàng 002", date: "2024-11-16" },
  ]);

  const [completedOrders, setCompletedOrders] = useState([
    { id: 3, name: "Đơn hàng 003", date: "2024-11-15" },
  ]);

  // Quản lý tab hiện tại
  const [currentTab, setCurrentTab] = useState("processing"); // "processing" hoặc "completed"

  // Chuyển đơn hàng từ "Đang xử lý" sang "Đã đặt"
  const completeOrder = (id:number) => {
    const orderToComplete = processingOrders.find((order) => order.id === id);
    if (orderToComplete) {
      // Loại bỏ đơn hàng khỏi danh sách "Đang xử lý"
      setProcessingOrders(processingOrders.filter((order) => order.id !== id));
      // Thêm đơn hàng vào danh sách "Đã đặt"
      setCompletedOrders([...completedOrders, orderToComplete]);
    }
  };

  // Chuyển đơn hàng từ "Đã đặt" về "Đang xử lý" (nếu cần)
  const revertOrder = (id:number) => {
    const orderToRevert = completedOrders.find((order) => order.id === id);
    if (orderToRevert) {
      // Loại bỏ đơn hàng khỏi danh sách "Đã đặt"
      setCompletedOrders(completedOrders.filter((order) => order.id !== id));
      // Thêm đơn hàng vào danh sách "Đang xử lý"
      setProcessingOrders([...processingOrders, orderToRevert]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="flex justify-around border-b border-gray-200 mb-6">
        <button
          onClick={() => setCurrentTab("processing")}
          className={`px-4 py-2 font-medium ${
            currentTab === "processing"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Đang xử lý
        </button>
        <button
          onClick={() => setCurrentTab("completed")}
          className={`px-4 py-2 font-medium ${
            currentTab === "completed"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          Đã đặt
        </button>
      </div>

      {/* Danh sách đơn hàng */}
      <div className="overflow-x-auto">
        {currentTab === "processing" && (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">#</th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Mã đơn hàng
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Tên đơn hàng
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Ngày đặt
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                 Số lượng
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                Tổng tiền
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Địa chỉ
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Trang thái
                </th>
              </tr>
            </thead>
            <tbody>
              {processingOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => completeOrder(order.id)}
                      className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Hoàn thành
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {currentTab === "completed" && (
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">#</th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Tên đơn hàng
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Ngày đặt
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {order.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => revertOrder(order.id)}
                      className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Quay lại
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Order;