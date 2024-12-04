import React, { useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse the query string to extract VNPay parameters
  const queryParams = new URLSearchParams(location.search);
  const vnpAmount = queryParams.get("vnp_Amount");
  const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
  const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
  const vnpResponseCode = queryParams.get("vnp_ResponseCode");

  const isPaymentSuccessful = vnpResponseCode === "00";

  useEffect(() => {
    if (isPaymentSuccessful) {
      handleConfirmPayment();
    }
  }, [isPaymentSuccessful]);

  const handleConfirmPayment = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const customerDetails = JSON.parse(localStorage.getItem("customerDetails") || "{}");

      const response = await axios.post("http://localhost:28017/payment/confirm", {
        vnp_Amount: Number(vnpAmount) / 100,
        vnp_OrderInfo,
        vnp_TransactionNo,
        customerDetails,
        items: cartItems,
        paymentMethod: "bank_transfer", // Adjust as needed
      });

      if (response.status === 200) {
        console.log("Order placed successfully:", response.data);
        // Clear local cart data
        localStorage.removeItem("cartItems");
        localStorage.removeItem("customerDetails");
      } else {
        console.error("Failed to place order:", response.data.message);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4 lg:p-8 bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl w-full">
          {isPaymentSuccessful ? (
            <>
              <h1 className="text-lg font-bold">Thanh toán thành công!</h1>
              <p className="text-sm mt-2">
                Cảm ơn bạn đã mua sắm tại Beautifullhouse. Đơn hàng của bạn đã
                được thanh toán thành công với mã giao dịch:{" "}
                <span className="font-bold">{vnp_TransactionNo}</span>.
              </p>
              <p className="text-sm mt-2">
                Tổng số tiền:{" "}
                <span className="font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(vnpAmount) / 100)}
                </span>.
              </p>
              <p className="text-sm mt-2">
                Mô tả: <span className="font-medium">{vnp_OrderInfo}</span>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-lg font-bold text-red-500">Thanh toán thất bại</h1>
              <p className="text-sm mt-2">
                Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc
                liên hệ với chúng tôi để được hỗ trợ.
              </p>
            </>
          )}
          <div className="flex justify-center gap-4 mt-6">
            <NavLink to="/products">
              <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-100">
                Tiếp tục mua hàng
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
