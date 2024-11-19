import React, { useEffect, useState } from "react";
import { Form, Input, Select, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addProduct } from "../../../service/products";
import { Icategory } from "../../../interface/category";
import { getAllCategories } from "../../../service/category";
import { upload } from "../../../service/upload";
import LoadingComponent from "../../Loading";

const Add = () => {
  const [category, setCategory] = useState<Icategory[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const activeCategories = category.filter((cat) => cat.status === "active");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);

    // Generate image previews
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
        const imageUrl = response.payload[0].url; // Adjust based on your API structure
        urls.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
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
        img: imageUrls, // Array of image URLs
        categoryID: values.category,
        status: true, // Default status is active
      };

      await addProduct(payload);
      message.success("Thêm Sản Phẩm thành công!");
      form.resetFields();
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
      message.error("Something went wrong. Please try again.");
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
      {contextHolder}
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        <Form form={form} onFinish={onFinish}>
          <div>
            <label className="mb-2 text-2xl text-black block">
              Tên sản phẩm:
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Bắt buộc nhập tên Sản Phẩm!" },
              ]}
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
          <label className="mb-2 text-2xl text-black block">
            Giá sản phẩm:
          </label>
          <div className="relative flex items-center">
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your product price!",
                },
              ]}
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
            <label className="mb-2 text-sm text-black block">
              Ảnh sản phẩm:
            </label>
            <div className="flex flex-wrap gap-4 mb-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <Input type="file" multiple onChange={handleFileChange} />
          </div>

          <div>
            <label className="mb-2 text-sm text-black block">Danh mục:</label>
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select a category!",
                },
              ]}
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

          <button
            type="submit"
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thêm mới sản phẩm
          </button>
        </Form>
      </div>
    </>
  );
};

export default Add;
