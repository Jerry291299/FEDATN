import React, { useEffect, useState } from "react";
import PlacedOrders from "./PlacedOrders";
import Footer from "./Footer";
import Header from "./Header";
import { getOrdersByUserId } from "../service/order"; // Adjust the import path as needed
import { NavLink } from "react-router-dom";

const Orderlisthistory = () => {
  const [orders, setOrders] = useState([]); // Orders state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = sessionStorage.getItem("user");
        if (!userData) {
          setError("User not logged in!");
          setLoading(false);
          return;
        }

        const { id } = JSON.parse(userData); // Assuming user data includes `id`
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

  if (loading) {
    return <p>Loading orders...</p>;
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
            Có vẻ như bạn chưa đặt bất kỳ đơn hàng nào. Hãy khám phá sản phẩm của chúng tôi và đặt hàng ngay hôm nay!
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
                <th className="border border-gray-300 px-4 py-2 text-left">Trạng thái thanh toán</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Vận chuyển</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{order.paymentMethod}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
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
