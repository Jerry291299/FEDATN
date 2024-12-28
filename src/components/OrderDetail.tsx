import React, { useEffect, useState } from "react";
import { notification, Button } from "antd";
import { getOrderById } from "../service/order"; // Import dịch vụ
import { IOrder } from "../interface/order"; // Import interface IOrder
import { useParams, Link } from "react-router-dom";
import LoadingComponent from "./Loading";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const showNotification = (
    type: "success" | "error",
    title: string,
    description: string
  ) => {
    notification[type]({
      message: title,
      description,
      placement: "topRight",
    });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        showNotification("error", "Lỗi", "ID đơn hàng không hợp lệ.");
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrderById(orderId!);
        console.log(orderData); // Kiểm tra cấu trúc dữ liệu
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
        showNotification("error", "Lỗi", "Không thể tải thông tin đơn hàng, vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng.</div>;
  }

  if (!order.customerDetails) {
    return <div>Thông tin khách hàng không có.</div>;
  }

  return (
    <div className="space-y-6 font-[sans-serif] max-w-md mx-auto" style={{ width: "500px" }}>
      <h2 className="text-2xl text-black" style={{ marginTop: "30px" }}>
        Chi Tiết Đơn Hàng #{order._id}
      </h2>
      <p>
        <strong>Tên khách hàng:</strong> {order.customerDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {order.customerDetails.email}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {order.customerDetails.phone}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {order.customerDetails.address}
      </p>
      {/* <p>
        <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
      </p> */}
      <p>
        <strong>Thành tiền:</strong>{" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(order.amount)}
      </p>

      <h3 className="text-xl">Các sản phẩm trong đơn hàng:</h3>
      <div className="flex flex-col gap-4">
        {order.items.map((item, index) => (
          <div key={index} className="border p-4 rounded">
            <p>
              <strong>Sản phẩm:</strong> {item.productId.name}
            </p>
            <p>
              <strong>Giá:</strong> {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.price)}
            </p>
            <p>
              <strong>Số lượng:</strong> {item.quantity}
            </p>
            <p>
              <strong>Ảnh:</strong>
              <div className="flex gap-2">
                {item.productId.img.map((imgUrl, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imgUrl}
                    alt={`Product Image ${imgIndex}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            </p>
          </div>
        ))}
      </div>

      <p>
        <strong>Trạng thái:</strong> {order.status}
      </p>
      <Link to="/admin/dashboard">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Quay lại
        </Button>
      </Link>
    </div>
  );
};

export default OrderDetail;