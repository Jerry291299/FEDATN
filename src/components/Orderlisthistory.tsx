import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { getOrdersByUserId } from "../service/order";
import { NavLink } from "react-router-dom";
import LoadingComponent from "./Loading";

interface Order {
  _id: string;
  createdAt: string;
  amount: number;
  paymentMethod: string;
  paymentstatus: string;
  status: string;
}

const Orderlisthistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const statusMapping: { [key: string]: string } = {
    pending: "Chờ xử lý",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
    processing: "Đang xử lý",
    in_progress: "Đã giao hàng",
    delivered: "Đã giao",
    deleted: "Đã hủy",
    failed: "Đã hủy"
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
          setError("User not logged in!");
          setLoading(false);
          return;
        }

        const { id } = JSON.parse(userData);
        const fetchedOrders = await getOrdersByUserId(id);
        setOrders(fetchedOrders);
      } catch (error) {
        setError("Failed to fetch orders.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: string) => {
    try {
      const confirmed = window.confirm(
        "Bạn có chắc chắn muốn hủy đơn hàng này?"
      );
      if (!confirmed) return;

      const response = await fetch(
        `http://localhost:28017/api/orders/${orderId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      const updatedOrder = await response.json();
      setOrders(
        (prevOrders) =>
          prevOrders
            .map((order) =>
              order._id === updatedOrder._id
                ? { ...order, status: updatedOrder.status }
                : order
            )
            .filter((order) => order.status !== "deleted")
      );

      alert("Đơn hàng đã được hủy thành công!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
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
    return <p className="text-red-500">{error}</p>;
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
                <th className="border border-gray-300 px-4 py-2 text-left">Vận chuyển</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
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
                        onClick={() => handleCancelOrder(order._id)}
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
      </div>
      <Footer />
    </>
  );
};

export default Orderlisthistory;
