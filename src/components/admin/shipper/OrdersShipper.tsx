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

  const handleOrderUpdate = async (orderId: string) => {
    setIsLoading(true);

    try {
      const statusUpdate = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        { status: "delivered" }
      );

      const paymentMethodUpdate = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        { paymentMethod: "Đã Thanh Toán" }
      );

      if (statusUpdate.status === 200 && paymentMethodUpdate.status === 200) {
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
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Danh sách đơn hàng cho shipper
      </h1>
      {isLoading && <p>Đang tải đơn hàng...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {currentOrders.length > 0 && !isLoading && !error ? (
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
                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.slice(0, 10).map((item, index) => (
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
                  ) : (
                    <p>Không có sản phẩm</p>
                  )}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  {order.customerDetails.phone}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  {order.customerDetails.address}
                </td>
                <td className="border-b px-4 py-2 font-semibold text-sm text-gray-600">
                  <span className="font-semibold text-black-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </span>
                </td>
                <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                  {order.status === "pending" ? "Đang xử lý" : "Đã giao"}
                </td>
                <td className="border-b px-4 py-2 text-sm text-gray-600">
                  <span className="text-sm font-semibold text-gray-600">
                    {order.paymentMethod === "cash_on_delivery"
                      ? "Chưa thanh toán"
                      : "Đã Thanh Toán"}
                  </span>
                </td>
                <td className="border-b px-4 py-2 text-sm font-semibold text-gray-600">
                  {order.status === "pending" &&
                  order.paymentMethod !== "Đã Thanh Toán" ? (
                    <button
                      onClick={() => handleOrderUpdate(order._id)}
                      className="bg-green-500 text-white px-3 py-1.5 rounded"
                    >
                      Đánh dấu đã giao và thanh toán
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 text-white px-3 py-1.5 rounded cursor-not-allowed"
                      disabled
                    >
                      Đã giao và thanh toán
                    </button>
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
