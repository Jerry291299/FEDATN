import React, { useEffect, useState } from "react";
import { Form, Input, Select, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addProduct } from "../../../service/products";
import { Icategory } from "../../../interface/category";
import { getAllCategories } from "../../../service/category";
import { upload } from "../../../service/upload";
import LoadingComponent from "../../Loading";
import { getAllMaterials } from "../../../service/material";

const Add = () => {
  const [category, setCategory] = useState<Icategory[]>([]);
  const [material, setMaterial] = useState<Icategory[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  // Utility function for notifications
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
    fetchCategories();

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
    fetchMaterial();
  }, []);

  const activeCategories = category.filter((cat) => cat.status === "active");
  const activeMaterial = material.filter((met) => met.status === "active");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
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
      const imageUrls = await uploadImages(files);
      const payload = {
        ...values,
        moTa: values.moTa,
        soLuong: values.soLuong,
        img: imageUrls,
        categoryID: values.category,
        materialID: values.material,
        status: true,
      };

      await addProduct(payload);
      showNotification("success", "Thành công", "Thêm sản phẩm thành công!");
      form.resetFields();
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error("Error adding product:", error);
      showNotification(
        "error",
        "Lỗi",
        "Không thể thêm sản phẩm, vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-xl">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Cột Bên Trái */}
            <div className="flex-1 space-y-6">
              {/* Tên sản phẩm */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Tên sản phẩm</label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Bắt buộc nhập tên sản phẩm!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    className="text-gray-700 p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </Form.Item>
              </div>
  
              {/* Số lượng */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Số lượng</label>
                <Form.Item
                  name="soLuong"
                  rules={[
                    {
                      required: true,
                      message: "Bắt buộc nhập số lượng!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập số lượng"
                    className="text-gray-700 p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </Form.Item>
              </div>
  
              {/* Giá sản phẩm */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Giá sản phẩm</label>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Bắt buộc nhập giá sản phẩm!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    className="text-gray-700 p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </Form.Item>
              </div>
  
              {/* Mô tả sản phẩm */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Mô tả sản phẩm</label>
                <Form.Item
                  name="moTa"
                  rules={[
                    {
                      required: true,
                      message: "Bắt buộc nhập mô tả sản phẩm!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Nhập mô tả sản phẩm"
                    className="text-gray-700 p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                    rows={5}
                  />
                </Form.Item>
              </div>
            </div>
  
            {/* Cột Bên Phải */}
            <div className="flex-1 space-y-6">
              {/* Ảnh sản phẩm */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Ảnh sản phẩm</label>
                <div className="flex flex-wrap gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative w-28 h-28">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-xs p-2 rounded-full shadow-md"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
  
              {/* Danh mục */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Danh mục</label>
                <Form.Item
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn danh mục!",
                    },
                  ]}
                >
                  <Select
                    className="w-full rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                    placeholder="Chọn danh mục"
                  >
                    {activeCategories.map((categoryID: Icategory) => (
                      <Select.Option key={categoryID._id} value={categoryID._id}>
                        {categoryID.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
  
              {/* Chất liệu */}
              <div>
                <label className="text-lg font-semibold text-gray-800">Chất liệu</label>
                <Form.Item
                  name="material"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn chất liệu!",
                    },
                  ]}
                >
                  <Select
                    className="w-full rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                    placeholder="Chọn chất liệu"
                  >
                    {activeMaterial.map((materialID: Icategory) => (
                      <Select.Option key={materialID._id} value={materialID._id}>
                        {materialID.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
  
          {/* Nút Submit */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Thêm mới sản phẩm
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};  

export default Add;
