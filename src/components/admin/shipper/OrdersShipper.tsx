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

  // Update order status and payment method
  const handleOrderUpdate = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        {
          status: "delivered", // Trạng thái đơn hàng
          paymentMethod: "Đã Thanh Toán", // Phương thức thanh toán
        }
      );

      if (response.status === 200 && response.data) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: "delivered",
                  paymentMethod: "Đã Thanh Toán",
                }
              : order
          )
        );
      } else {
        setError(
          "Không thể cập nhật trạng thái đơn hàng và phương thức thanh toán"
        );
      }
    } catch (err) {
      setError(
        "Không thể cập nhật trạng thái đơn hàng và phương thức thanh toán"
      );
      console.error("Error updating order status and payment method:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        {
          status: "cancelledOrder",
          paymentMethod: "cash_on_delivery", // Cập nhật phương thức thanh toán
        }
      );

      if (response.status === 200 && response.data) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: "cancelledOrder",
                  paymentMethod: "cash_on_delivery",
                }
              : order
          )
        );
      } else {
        setError("Không thể hủy đơn hàng");
      }
    } catch (err) {
      setError("Không thể hủy đơn hàng");
      console.error("Error canceling order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Render UI
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Danh sách đơn hàng cho shipper
      </h1>
      {isLoading && <p>Đang tải đơn hàng...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {currentOrders.length > 0 ? (
        <table className="min-w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Khách hàng
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Sản phẩm
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Số điện thoại
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Địa chỉ
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Tổng số tiền
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Trạng thái
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Phương thức thanh toán
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr
                key={order._id}
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  {order.customerDetails.name}
                </td>
                <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                  {order.items && order.items.length > 0
                    ? order.items.slice(0, 10).map((item, index) => (
                        <div key={index}>
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
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  {order.customerDetails.phone}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  {order.customerDetails.address}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalAmount)}
                </td>
                <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                  {order.status === "pending"
                    ? "Đang xử lý"
                    : order.status === "delivered"
                    ? "Đã giao"
                    : order.status === "cancelledOrder"
                    ? "Đã hủy"
                    : "Trạng thái không xác định"}
                </td>

                <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                  {order.paymentMethod === "cash_on_delivery"
                    ? "Chưa thanh toán"
                    : "Đã Thanh Toán"}
                </td>

                <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                  {order.status === "pending" ? (
                    <div className="flex justify-center gap-x-4">
                      {" "}
                      {/* Căn giữa và khoảng cách đều */}
                      <button
                        onClick={() => handleOrderUpdate(order._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded w-40 text-center"
                      >
                        Đánh dấu đã giao và thanh toán
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded w-40 text-center"
                      >
                        Hủy giao hàng
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button className="bg-gray-500 text-white px-4 py-2 rounded w-40 text-center cursor-not-allowed">
                        {order.status === "cancelledOrder"
                          ? "Đã hủy"
                          : "Đã giao và thanh toán"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Không có đơn hàng nào</p>
      )}

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default OrdersShipper;
