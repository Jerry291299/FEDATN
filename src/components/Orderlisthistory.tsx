import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { getOrdersByUserId, Order } from "../service/order";
import { NavLink } from "react-router-dom";
import LoadingComponent from "./Loading";

const Orderlisthistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cancelReason, setCancelReason] = useState<string>(""); // State cho lý do hủy
  const itemsPerPage = 5; // Số đơn hàng hiển thị trên mỗi trang

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

  const paymentMethodMapping: { [key: string]: string } = {
    credit_card: "Thẻ tín dụng",
    paypal: "PayPal",
    bank_transfer: "Chuyển khoản ngân hàng",
    cash_on_delivery: "Thanh toán khi nhận hàng",
    e_wallet: "Ví điện tử",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (!userData) {
          setError("Bạn chưa đăng nhập. Vui lòng đăng nhập để xem lịch sử đơn hàng.");
          setLoading(false);
          return;
        }

        const { id } = JSON.parse(userData);
        const fetchedOrders = await getOrdersByUserId(id);
        setOrders(fetchedOrders);
      } catch (error) {
        setError("Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const confirmCancelOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleCancelOrder = async () => {
    if (!selectedOrderId || !cancelReason) {
      alert("Vui lòng chọn lý do hủy đơn hàng.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:28017/api/orders/${selectedOrderId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason: cancelReason }) // Gửi lý do hủy
        }
      );

      if (!response.ok) {
        throw new Error("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders
          .map((order) =>
            order._id === updatedOrder._id
              ? { ...order, status: updatedOrder.status }
              : order
          )
          .filter((order) => order.status !== "deleted")
      );
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Rất tiếc, không thể hủy đơn hàng. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ khách hàng.");
    } finally {
      setShowModal(false);
      setSelectedOrderId(null);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <LoadingComponent />
        <Footer />
      </>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Không có đơn hàng nào
          </h2>
          <p className="text-gray-500 text-center max-w-md">
            Có vẻ như bạn chưa đặt bất kỳ đơn hàng nào. Hãy khám phá sản phẩm
            của chúng tôi và đặt hàng ngay hôm nay!
          </p>
          <NavLink
            to="/products"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            Khám phá sản phẩm
          </NavLink>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">DANH SÁCH ĐƠN HÀNG MỚI NHẤT</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Mã đơn hàng</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ngày đặt</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Thành tiền</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Phương thức thanh toán</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Trạng thái thanh toán</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tình trạng đơn hàng</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.amount)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {paymentMethodMapping[order.paymentMethod] || order.paymentMethod}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {statusMapping[order.paymentstatus] || order.paymentstatus}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {statusMapping[order.status] || order.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => confirmCancelOrder(order._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                      >
                        Hủy
                      </button>
                    )}
                    {order.status === "cancelled" && (
                      <span className="text-gray-500">Đã hủy</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"} rounded hover:bg-blue-500 hover:text-white`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal hủy đơn */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Lý do hủy đơn hàng</h3>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            >
              <option value="">Chọn lý do</option>
              <option value="Không cần sản phẩm nữa">Không cần sản phẩm nữa</option>
              <option value="Thay đổi quyết định">Thay đổi quyết định</option>
              <option value="Giá sản phẩm quá cao">Giá sản phẩm quá cao</option>
              <option value="Lý do khác">Lý do khác</option>
            </select>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Orderlisthistory;
