import React, { useEffect, useState } from "react";
import { axiosservice } from "../../config/API";
import { IOrder } from "../../interface/order";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";

interface Order {
  _id: string;
  createdAt: string;
  amount: number;
  paymentMethod: string;
  paymentstatus: string;
  status: string;
}
const Order = () => {
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
        const sortedOrders = response.data.sort((a: IOrder, b: IOrder) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
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
    <div className="mb-[20px] flex flex-col w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo mã đơn"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <div className="py-2 inline-block w-full px-0">
          <div className="overflow-hidden">
            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <table className="min-w-full table-auto">
                  <thead className="bg-white border-b">
                    <tr>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">STT</th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Mã đơn</th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Ngày đặt hàng</th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Đơn hàng</th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Tổng tiền</th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order, index) => (
                      <tr key={order._id} className="bg-gray-100 border-b">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order._id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.customerDetails.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {order.items.map((item, idx) => (
                            <div key={idx}>
                              {item.name} - {item.quantity} x {formatCurrency(item.price)}
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(order.amount)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center">
                            <span
                              className={`px-4 py-3 text-sm font-semibold rounded-lg shadow-sm text-white ${order.status === "pending"
                                ? "bg-yellow-500"
                                : order.status === "delivered"
                                  ? "bg-green-500"
                                  : order.status === "cancelledOrder"
                                    ? "bg-red-500"
                                    : "bg-gray-400"
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
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center">
                            <NavLink to={`/viewdonhang/${order._id}`}>
                              <button
                                className="bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all "
                              >
                                Xem
                              </button>
                            </NavLink>
                          </div>
                        </td>
                      </tr>

                    ))}

                  </tbody>

                </table>

                {/* Ant Design Pagination */}
                <div className="flex justify-center mt-4">
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
