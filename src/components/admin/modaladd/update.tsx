
import React, { useEffect, useState } from "react";
import { Form, Input, Select, notification } from "antd";
import { getProductByID, updateProduct } from "../../../service/products";
import { Icategory } from "../../../interface/category";
import { getAllCategories } from "../../../service/category";
import { upload } from "../../../service/upload";
import LoadingComponent from "../../Loading";
import { getAllMaterials } from "../../../service/material";
import { Iproduct } from "../../../interface/products";
import { useNavigate, useParams } from "react-router-dom";

const ProductUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Icategory[]>([]);
  const [material, setMaterial] = useState<Icategory[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Iproduct | null>(null);
  const navigate = useNavigate();

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
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể tải danh mục, vui lòng thử lại!"
        );
      }
    };

    const fetchMaterial = async () => {
      try {
        const data = await getAllMaterials();
        setMaterial(data);
      } catch (error) {
        console.error("Error fetching material:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể tải chất liệu, vui lòng thử lại!"
        );
      }
    };

    const fetchProduct = async () => {
      try {
        const productData = await getProductByID(id);
        setProduct(productData);
        setExistingImages(productData.img || []);
        form.setFieldsValue({
          name: productData.name,
          soLuong: productData.soLuong,
          price: productData.price,
          moTa: productData.moTa,
          category: productData.category._id,
          material: productData.material._id,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể tải sản phẩm, vui lòng thử lại!"
        );
      }
    };

    fetchCategories();
    fetchMaterial();
    fetchProduct();
  }, [id]);

  const activeCategories = category.filter((cat) => cat.status === "active");
  const activeMaterial = material.filter((met) => met.status === "active");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveImage = (url: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("images", file);

      try {
        const response = await upload(formData);
        const imageUrl = response.payload[0].url;
        urls.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        showNotification(
          "error",
          "Lỗi tải ảnh",
          "Không thể tải ảnh lên, vui lòng thử lại!"
        );
      }
    }
    return urls;
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const newImageUrls = await uploadImages(files);
      const updatedImages = [...existingImages, ...newImageUrls];

      const payload = {
        ...values,
        moTa: values.moTa,
        soLuong: values.soLuong,
        img: updatedImages, 
        categoryID: values.category,
        materialID: values.material,
        status: true,
      };

      await updateProduct(id, payload);
      showNotification("success", "Thành công", "Cập nhật sản phẩm thành công!");
      setFiles([]); 
      navigate("/admin/dashboard", { state: { shouldRefetch: true } });
    } catch (error) {
      console.error("Error updating product:", error);
      showNotification("error", "Lỗi", "Không thể cập nhật sản phẩm, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) {
    return <LoadingComponent />;
  }

  return (
    <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
      <Form form={form} onFinish={onFinish}>
      <div>
             <label className="mb-2 text-2xl text-black block">Tên sản phẩm:</label>
          <Form.Item
              name="name"
              rules={[{ required: true, message: "Bắt buộc nhập tên Sản Phẩm!" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
          </div>

          <div>
            <label className="mb-2 text-2xl text-black block">Số Lượng</label>
            <Form.Item
              name="soLuong"
              rules={[{ required: true, message: "Bắt buộc nhập số lượng!" }]}
            >
              <Input type="number" placeholder="Enter product quantity" />
            </Form.Item>
          </div>

          <div>
            <label className="mb-2 text-2xl text-black block">Giá sản phẩm:</label>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Please input your product price!" }]}
            >
              <Input
                type="number"
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                placeholder="Enter Price $$$"
              />
            </Form.Item>
          </div>

          <div>
            <label className="mb-2 text-2xl text-black block">Mô tả</label>
            <Form.Item
              name="moTa"
              rules={[{ required: true, message: "Bắt buộc nhập mô tả!" }]}
            >
              <Input placeholder="Enter product description" />
            </Form.Item>
          </div>
        <div>
          <label className="mt-10 mb-2 text-sm text-black block">Ảnh hiện tại:</label>
          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((url) => (
              <div key={url} className="relative">
                <img
                  src={url}
                  alt="Product"
                  className="w-full h-auto rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <div>
          <label className="mt-10 mb-2 text-sm text-black block">Thêm ảnh mới:</label>
          <Input type="file" multiple onChange={handleFileChange} />
        </div>

        <div className="pt-[20px]">
        <label className="mt-10 mb-2 text-sm text-black block">Danh mục</label>

           <Form.Item
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select style={{ width: "100%" }}>
                {activeCategories.map((categoryID: Icategory) => (
                  <Select.Option key={categoryID._id} value={categoryID._id}>
                    {categoryID.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div>
            <label className="mt-10 mb-2 text-sm text-black block">Chất liệu</label>
            <Form.Item
              name="material"
              rules={[{ required: true, message: "Please select a material!" }]}
            >
              <Select style={{ width: "100%" }}>
                {activeMaterial.map((materialID: Icategory) => (
                  <Select.Option key={materialID._id} value={materialID._id}>
                    {materialID.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-[#2F6D7E] text-white py-3 px-6 rounded-md text-xl"
          >
            Cập nhật sản phẩm
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ProductUpdate;

