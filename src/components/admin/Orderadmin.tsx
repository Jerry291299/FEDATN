import React, { useEffect, useState } from "react";
import { axiosservice } from "../../config/API";
import { IOrder } from "../../interface/order";
import { Pagination } from "antd";

interface Props {}

const Order = (props: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosservice.get("/orders");
        setOrders(response.data);
        setFilteredOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (searchValue) {
      const filtered = orders.filter((order) =>
        order._id.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-700">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500 mt-1">Theo dõi và quản lý các đơn hàng trong hệ thống</p>
        </header>

        <div className="p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm theo mã đơn"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-center text-lg text-gray-600">Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-blue-100 text-blue-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">STT</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mã đơn</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Địa chỉ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Đơn hàng</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Giá trị</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((order, index) => (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 transition duration-200 ease-in-out"
                        >
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-blue-600">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {order.customerDetails.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {order.customerDetails.address}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="mb-1">
                                {item.name} - {item.quantity} x {formatCurrency(item.price)}
                              </div>
                            ))}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {formatCurrency(order.amount)}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-3 py-1 inline-block text-white rounded-lg shadow-sm text-xs font-medium ${
                                order.status === "pending"
                                  ? "bg-yellow-500"
                                  : order.status === "delivered"
                                  ? "bg-green-500"
                                  : order.status === "cancelledOrder"
                                  ? "bg-red-500"
                                  : "bg-red-500"
                              }`}
                            >
                              {order.status === "pending"
                                ? "Đang xử lý"
                                : order.status === "delivered"
                                ? "Đã giao"
                                : order.status === "cancelledOrder"
                                ? "Đã hủy"
                                : "Thất bại"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-4 text-gray-500 font-light"
                        >
                          Không có đơn hàng nào.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="flex justify-center mt-6">
                  <Pagination
                    current={currentPage}
                    total={filteredOrders.length}
                    pageSize={itemsPerPage}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
