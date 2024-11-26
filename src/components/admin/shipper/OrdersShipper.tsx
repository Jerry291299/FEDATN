import axios from "axios";
import React, { useEffect, useState } from "react";
import { IOrderShipper } from "../../../service/order";

type Props = {};

const OrdersShipper = (props: Props) => {
  const [orders, setOrders] = useState<IOrderShipper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<IOrderShipper[]>(
          "http://localhost:28017/orders-list"
        );
        setOrders(response.data);
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng");
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Danh sách đơn hàng cho shipper
      </h1>

      {isLoading && <p className="text-center text-gray-500">Đang tải đơn hàng...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {currentOrders.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {["Khách hàng", "Sản phẩm", "Số điện thoại", "Địa chỉ", "Tổng số tiền", "Trạng thái", "Phương thức thanh toán", "Hành động"].map(
                  (header) => (
                    <th key={header} className="border-b px-4 py-2 text-left font-semibold">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">{order.customerDetails.name}</td>
                  <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                    {order.items && order.items.length > 0
                      ? order.items.slice(0, 10).map((item, idx) => (
                          <div key={idx}>
                            <span>
                              {item.name} -{" "}
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price)}{" "}
                              x {item.quantity}
                            </span>
                          </div>
                        ))
                      : "Không có sản phẩm"}
                  </td>
                  <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">{order.customerDetails.phone}</td>
                  <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">{order.customerDetails.address}</td>
                  <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center">
                          <span
                            className={`px-4 py-1 text-sm font-semibold rounded-lg shadow-sm text-white ${order.status === "pending"
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
                                  : "Không xác định"}
                          </span>
                        </div>
                      </td>
                  <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                    {order.paymentMethod === "cash_on_delivery" ? "Chưa thanh toán" : "Đã Thanh Toán"}
                  </td>
                  <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                    {order.status === "pending" ? (
                      <div className="flex justify-center gap-x-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                          Đã giao và thanh toán
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">{order.status === "cancelledOrder" ? "Đã hủy" : "Đã giao"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có đơn hàng nào</p>
      )}

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersShipper;
