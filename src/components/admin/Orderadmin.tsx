import React, { useEffect, useState } from "react";
import { axiosservice } from "../../config/API";
import { IOrder } from "../../interface/order";
import { Pagination, Modal, Input } from "antd";
import { NavLink } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from "@ant-design/icons";

interface Props {}

const Order = (props: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null); // Track selected order for details
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // Modal visibility
  const [cancelReason, setCancelReason] = useState<string>(""); // Cancellation reason
  const [orderIdToCancel, setOrderIdToCancel] = useState<string | null>(null); // Selected order ID for cancellation
  const itemsPerPage = 5;

  const statusMapping: { [key: string]: string } = {
    pending: "Chờ xử lý",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    processing: "Đang xử lý",
    in_progress: "Đang giao hàng",
    delivered: "Đã giao",
    deleted: "Đã hủy",
    failed: "Đã hủy",
  };

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
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
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
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCancelOrder = (orderId: string) => {
    if (!orderId) {
      alert("Không tìm thấy mã đơn hàng để hủy.");
      return;
    }

    setOrderIdToCancel(orderId); // Set the order ID for cancellation
    setIsModalVisible(true); // Show the modal
  };

  const handleOk = async () => {
    if (!cancelReason) {
      alert("Bạn cần nhập lý do hủy đơn hàng.");
      return;
    }
  
    try {
      const response = await axiosservice.post(
        `http://localhost:28017/api/orders/${orderIdToCancel}/cancel`,
        {
          reason: cancelReason, // Gửi lý do hủy đơn hàng
        }
      );
  
      if (response.status !== 200) {
        throw new Error("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
      }
  
      const updatedOrder = response.data; // Lấy thông tin đơn hàng đã cập nhật từ phản hồi
  
      // Cập nhật trạng thái trong danh sách đơn hàng mà không cần phải hiển thị lại modal confirm
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id
            ? {
                ...order,
                status: updatedOrder.status, // Cập nhật trạng thái của đơn hàng
                cancelReason: {
                  reason: updatedOrder.cancelReason.reason,
                  canceledAt: updatedOrder.cancelReason.canceledAt,
                  canceledBy: updatedOrder.cancelReason.canceledBy,
                },
              }
            : order
        )
      );
      window.location.reload();
      setIsModalVisible(false); // Đóng modal
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert(
        "Rất tiếc, không thể hủy đơn hàng. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ khách hàng."
      );
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
    setCancelReason(""); // Clear the reason
    setOrderIdToCancel(null); // Clear the order ID
  };

  const closeModal = () => {
    setSelectedOrder(null); // Close the modal by clearing the selected order
  };

  return (
    <div className="w-full h-screen bg-gray-50 p-4">
      <div className="mx-auto bg-white rounded-lg shadow-md p-6">
        <header className="border-b pb-4 mb-4">
          <h1 className="text-xl font-semibold text-gray-700">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500">Theo dõi và quản lý các đơn hàng</p>
        </header>
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo mã đơn"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          {loading ? (
            <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">Không có đơn hàng nào</p>
          ) : (
            <>
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">STT</th>
                    <th className="border border-gray-300 px-4 py-2">Mã đơn</th>
                    <th className="border border-gray-300 px-4 py-2">Ngày đặt</th>
                    <th className="border border-gray-300 px-4 py-2">Thanh toán</th>
                    <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
                    <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                    <th className="border border-gray-300 px-4 py-2">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order, index) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order._id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {statusMapping[order.paymentstatus] || order.paymentstatus}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {order.amount.toLocaleString()} VND
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`inline-block px-4 py-1 rounded text-white text-center whitespace-nowrap ${
                            order.status === "pending"
                              ? "bg-yellow-500"
                              : order.status === "delivered"
                              ? "bg-green-500"
                              : order.status === "cancelled"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                          style={{ minWidth: "120px" }}
                        >
                          {statusMapping[order.status]}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-2">
                          {order.status === "pending" && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              <CloseCircleOutlined className="mr-1" />
                              Hủy
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            <EyeOutlined className="mr-1" />
                            Xem
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                className="mt-4 text-center"
                current={currentPage}
                total={filteredOrders.length}
                pageSize={itemsPerPage}
                onChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      {/* Cancellation Modal */}
      <Modal
        title="Nhập lý do hủy đơn hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Input.TextArea
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Nhập lý do hủy đơn hàng"
        />
      </Modal>

      {/* Order Details Modal */}
      {selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-md w-1/2">
      <h2 className="text-2xl font-semibold mb-4">Chi tiết đơn hàng</h2>
      <p><strong>Mã đơn: </strong>{selectedOrder._id}</p>
      <p><strong>Ngày đặt: </strong>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
      <p><strong>Thanh toán: </strong>{statusMapping[selectedOrder.paymentstatus]}</p>
      <p><strong>Trạng thái: </strong>{statusMapping[selectedOrder.status]}</p>

      {selectedOrder.status === "cancelled" && (
        <div className="mt-4">
          <strong>Lý do hủy: </strong>
          <p>{selectedOrder.cancelReason?.reason || "Không có lý do"}</p>
        </div>
      )}

      <p><strong>Sản phẩm:</strong></p>
      <ul>
        {selectedOrder.items.map((item, idx) => (
          <li key={idx}>
            {item.name} ({item.quantity}) - {item.price.toLocaleString()} VND
          </li>
        ))}
      </ul>

      <p><strong>Tổng tiền: </strong>{selectedOrder.amount.toLocaleString()} VND</p>

      {/* Display Customer Details */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Thông tin khách hàng</h2>
        <p><strong>Khách hàng: </strong>{selectedOrder.customerDetails.name}</p>
        <p><strong>Điện thoại: </strong>{selectedOrder.customerDetails.phone}</p>
        <p><strong>Email: </strong>{selectedOrder.customerDetails.email}</p>
        <p><strong>Địa chỉ: </strong>{selectedOrder.customerDetails.address}</p>
        {selectedOrder.customerDetails.notes && (
          <p><strong>Ghi chú: </strong>{selectedOrder.customerDetails.notes}</p>
        )}
      </div>

      <button
        onClick={closeModal}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Đóng
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Order;
