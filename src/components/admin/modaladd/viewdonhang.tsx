import React, { useEffect, useState } from "react";
import { notification, Button } from "antd";
import { getOrderById } from "../../../service/order"; // Service lấy chi tiết đơn hàng
import { IOrder } from "../../../interface/order"; // Import interface IOrder
import { useParams, Link } from "react-router-dom";
import LoadingComponent from "../../Loading";

const OrderView = () => {
  const { id } = useParams<{ id: string }>();
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
      if (!id) {
        console.error("ID không hợp lệ");
        showNotification("error", "Lỗi", "ID không hợp lệ");
        setLoading(false);
        return;
      }

      try {
        const orderData = await getOrderById(id);
        console.log("Fetched Order Data:", orderData); // Debug dữ liệu trả về
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể tải đơn hàng, vui lòng thử lại!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!order) {
    return <div>Không tìm thấy đơn hàng hoặc dữ liệu không hợp lệ.</div>;
  }

  return (
    <div className="space-y-6 font-[sans-serif] max-w-md mx-auto" style={{ width: "500px" }}>
      <h2 className="text-2xl text-black" style={{ marginTop: "30px" }}>
        Đơn hàng #{order._id || "N/A"}
      </h2>
      <p>
        <strong>Người đặt:</strong> {order.customerDetails?.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {order.customerDetails?.email || "N/A"}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {order.customerDetails?.phone || "N/A"}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {order.customerDetails?.address || "N/A"}
      </p>
      <p>
        <strong>Ghi chú:</strong> {order.customerDetails?.notes || "Không có"}
      </p>
      <p>
        <strong>Ngày đặt:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
      </p>
      <p>
        <strong>Thành tiền:</strong>{" "}
        {order.amount
          ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.amount)
          : "N/A"}
      </p>
      <p>
        <strong>Tình trạng đơn hàng:</strong> {order.status || "N/A"}
      </p>

      <h3 className="text-xl mt-6">Các sản phẩm trong đơn hàng:</h3>
      <div className="flex flex-wrap gap-4 mb-4">
        {order.items && order.items.length > 0 ? (
          order.items.map((item, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={item.productId?.img?.[0] || "/placeholder-image.png"} // Hình ảnh mặc định
                alt={`Product Image ${index}`}
                className="w-full h-full object-cover rounded"
              />
              <p><strong>{item.productId?.name || "Sản phẩm không rõ"}</strong></p>
              <p>Số lượng: {item.quantity || 0}</p>
              <p>
                Giá:{" "}
                {item.price
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)
                  : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào trong đơn hàng.</p>
        )}
      </div>

      <Link to="/admin/dashboard">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Quay lại
        </Button>
      </Link>
    </div>
  );
};

export default OrderView;
