import React, { useEffect, useState } from 'react';

const OrderList = () => {
  // State quản lý dữ liệu
  const [orders, setOrders] = useState([]); // Lưu danh sách đơn hàng
  const [loading, setLoading] = useState(true); // Trạng thái đang tải
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Fetch dữ liệu từ API khi component render lần đầu
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Gọi API để lấy dữ liệu đơn hàng
        const response = await fetch('http://localhost:3000/orders'); // Thay bằng API thực tế
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu, vui lòng thử lại sau.');
        }
        const data = await response.json();
        setOrders(data); // Cập nhật danh sách đơn hàng vào state
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchOrders();
  }, []); // Chỉ gọi API 1 lần khi component được mount

  // Nếu đang tải dữ liệu, hiển thị thông báo "Đang tải..."
  if (loading) {
    return <p className="text-center mt-4">Đang tải...</p>;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <p className="text-center text-red-500 mt-4">{error}</p>;
  }

  // Nếu không có đơn hàng, hiển thị thông báo
  if (orders.length === 0) {
    return <p className="text-center mt-4">Không có đơn hàng nào.</p>;
  }

  // Render danh sách đơn hàng
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Danh sách đơn hàng mới nhất</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Mã đơn hàng</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Ngày đặt</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Thành tiền</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Trạng thái thanh toán</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Vận chuyển</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{}</td>
                <td className="border border-gray-300 px-4 py-2">{}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{}đ</td>
                <td className="border border-gray-300 px-4 py-2">{}</td>
                <td className="border border-gray-300 px-4 py-2">{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;