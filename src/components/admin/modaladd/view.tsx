import React, { useEffect, useState } from "react";
import { notification, Button } from "antd";
import { getProductByID } from "../../../service/products"; // Assuming you have this service
import { Iproduct } from "../../../interface/products"; // Import Iproduct interface
import { useParams, Link } from "react-router-dom";
import LoadingComponent from "../../Loading";

const ProductView = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Iproduct | null>(null);
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
    const fetchProduct = async () => {
      try {
        const productData = await getProductByID(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể tải sản phẩm, vui lòng thử lại!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="space-y-6 font-[sans-serif] max-w-md mx-auto" style={{ width: "500px" }}>
      <h2 className="text-2xl text-black" style={{ marginTop: "30px" }}>
         {product.name}
      </h2>
      <p>
        <strong>Danh mục:</strong> {product.category?.name}
      </p>
      <p>
        <strong>Chất liệu:</strong> {product.material?.name}
      </p>
      <p>
        <strong>Số lượng:</strong> {product.soLuong}
      </p>
      <p>
        <strong>Giá:</strong>{" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}
      </p>

      <p>
        <strong>Ảnh:</strong>
      </p>
      <div className="flex flex-wrap gap-4 mb-4">
        {product.img.map((imgUrl, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={imgUrl}
              alt={`Product Image ${index}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>
      <p>
        <strong>Số lượng:</strong> {product.soLuong}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        {product.status ? "Hoạt động" : "Vô hiệu hóa"}
      </p>
      <p>
        <strong>Mô tả:</strong> {product.moTa}
      </p>
      <p>
        <strong>Đánh giá:</strong> {product.rating}
      </p>
      <Link to="/admin/dashboard">
        <Button type="primary" style={{ marginBottom: 16 }}>
          Quay lại
        </Button>
      </Link>
    </div>
  );
};

export default ProductView;
