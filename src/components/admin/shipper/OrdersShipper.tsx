import axios from "axios";
import React, { useEffect, useState } from "react";
import { IOrderShipper } from "../../../service/order";

type Props = {};

const OrdersShipper = (props: Props) => {
  const [orders, setOrders] = useState<IOrderShipper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(7);

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

  // Update order status to "in progress"
  const handleInProgressOrder = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        {
          status: "in_progress",
        }
      );

      if (response.status === 200 && response.data) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: "in_progress",
                }
              : order
          )
        );
      } else {
        setError("Không thể cập nhật trạng thái đơn hàng");
      }
    } catch (err) {
      setError("Không thể cập nhật trạng thái đơn hàng");
      console.error("Error updating order status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update order status to "delivered" and change payment method
  const handleConfirmDelivery = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        {
          status: "delivered",
          paymentMethod: "Đã Thanh Toán",
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
        setError("Không thể xác nhận giao hàng");
      }
    } catch (err) {
      setError("Không thể xác nhận giao hàng");
      console.error("Error confirming delivery:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle unsuccessful delivery (order not delivered)
  const handleFailedDelivery = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Find the order in the current state
      const orderToUpdate = orders.find((order) => order._id === orderId);

      if (!orderToUpdate) {
        setError("Order not found");
        return;
      }

      // Step 2: Prepare the product quantities to return to inventory
      const returnedItems = orderToUpdate.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity, // Quantity to return to inventory
      }));

      // Step 3: Send the request to update the order status to "failed"
      const response = await axios.put(
        `http://localhost:28017/orders-list/${orderId}`,
        {
          status: "failed",
          paymentMethod: "cash_on_delivery",
          returnedItems, // Send the items to be returned for inventory update
        }
      );

      if (response.status === 200 && response.data) {
        // Step 4: Update the orders in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: "failed",
                  paymentMethod: "cash_on_delivery",
                }
              : order
          )
        );

        console.log("Order marked as failed and inventory updated.");
      } else {
        setError("Failed to update order status.");
      }
    } catch (err) {
      setError("An error occurred while updating order status.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 font-semibold">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Danh sách đơn hàng cho shipper
      </h1>

      {isLoading && (
        <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {currentOrders.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-6">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                {[
                  "Khách hàng",
                  "Sản phẩm",
                  "Số điện thoại",
                  "Địa chỉ",
                  "Tổng số tiền",
                  "Trạng thái",
                  "Phương thức thanh toán",
                  "Hành động",
                ].map((header) => (
                  <th
                    key={header}
                    className="border-b px-6 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`hover:bg-blue-50 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {order.customerDetails.name}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {order.items && order.items.length > 0
                      ? order.items.slice(0, 5).map((item, idx) => (
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
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {order.customerDetails.phone}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {order.customerDetails.address}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span
                        className={`px-4 py-2 text-sm font-semibold rounded-lg text-white ${
                          order.status === "pending"
                            ? "bg-yellow-500"
                            : order.status === "in_progress"
                            ? "bg-blue-500"
                            : order.status === "delivered"
                            ? "bg-green-500"
                            : order.status === "cancelledOrder"
                            ? "bg-red-500"
                            : order.status === "failed"
                            ? "bg-gray-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Đang xử lý"
                          : order.status === "in_progress"
                          ? "Đang giao"
                          : order.status === "delivered"
                          ? "Đã giao"
                          : order.status === "cancelledOrder"
                          ? "Đã hủy"
                          : order.status === "failed"
                          ? "Thất bại"
                          : "Thất bại"}
                      </span>
                    </div>
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {order.paymentMethod === "cash_on_delivery"
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-600">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleInProgressOrder(order._id)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
                      >
                        Nhận đơn
                      </button>
                    )}

                    {order.status === "in_progress" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleConfirmDelivery(order._id)}
                          className="bg-green-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
                        >
                          Giao thành công
                        </button>

                        {order.paymentMethod === "cash_on_delivery" && (
                          <button
                            onClick={() => handleFailedDelivery(order._id)}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                          >
                            Giao thất bại
                          </button>
                        )}
                      </div>
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

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav>
          <ul className="flex list-none space-x-2">
            {Array.from({
              length: Math.ceil(orders.length / itemsPerPage),
            }).map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-6 py-2 rounded-md text-white ${
                    currentPage === index + 1
                      ? "bg-blue-500"
                      : "bg-gray-200 text-gray-600"
                  } transition-all duration-300 hover:bg-blue-600`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default OrdersShipper;
