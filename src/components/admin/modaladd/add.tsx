import React, { useEffect, useState } from "react";
import { Form, Input, Select, notification } from "antd";
import { addProduct } from "../../../service/products";
import { Icategory } from "../../../interface/category";
import { getAllCategories } from "../../../service/category";
import { upload } from "../../../service/upload";
import LoadingComponent from "../../Loading";
import { getAllMaterials } from "../../../service/material";
import { useNavigate } from "react-router-dom";

type Variant = {
  size: string;
  quantity: number;
  price: number;
  discount?: number;
};

const Add = () => {
  const [category, setCategory] = useState<Icategory[]>([]);
  const [material, setMaterial] = useState<Icategory[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [variants, setVariants] = useState<Variant[]>([
    { size: "", quantity: 0, price: 0, discount: undefined },
  ]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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

      //Xác thực các biến thể trước khi gửi
      const validVariants = variants.filter(
        (variant) => variant.size && variant.quantity > 0 && variant.price > 0
      );

      // Kiểm tra kích thước trùng lặp
      const sizeSet = new Set();
      const duplicateSizes = validVariants.filter((variant) => {
        if (sizeSet.has(variant.size)) {
          return true;
        }
        sizeSet.add(variant.size);
        return false;
      });

      if (duplicateSizes.length > 0) {
        showNotification(
          "error",
          "Lỗi",
          "Kích thước phải là duy nhất cho từng biến thể!"
        );
        return;
      }

      if (validVariants.length === 0) {
        showNotification(
          "error",
          "Lỗi",
          "Phải có ít nhất một biến thể hợp lệ!"
        );
        return;
      }

      const payload = {
        ...values,
        moTa: values.moTa,
        soLuong: values.soLuong,
        img: imageUrls,
        categoryID: values.category,
        materialID: values.material,
        variants: validVariants, // Gửi các biến thể hợp lệ
        status: true,
      };

      // Gọi dịch vụ để thêm sản phẩm với các biến thể
      await addProduct(payload);
      showNotification("success", "Thành công", "Thêm sản phẩm thành công!");
      navigate("/admin/dashboard");
      form.resetFields();
      setFiles([]);
      setPreviews([]);
      setVariants([{ size: "", quantity: 0, price: 0, discount: undefined }]);
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

  const calculateTotalPrice = () => {
    const total = variants.reduce((acc, variant) => {
      const discountAmount = variant.discount || 0;
      const effectivePrice = variant.price - discountAmount;
      return acc + (effectivePrice > 0 ? effectivePrice : 0) * variant.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string | number | undefined
  ) => {
    const updatedVariants = [...variants];

    if (field === "size") {
      updatedVariants[index][field] = value as string;
    } else if (field === "quantity" || field === "price") {
      updatedVariants[index][field] = value as number;
    } else if (field === "discount") {
      updatedVariants[index][field] = value as number | undefined;
    }

    setVariants(updatedVariants);
    calculateTotalPrice(); // Tính tổng bất cứ khi nào một biến thể thay đổi
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { size: "", quantity: 0, price: 0, discount: undefined },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
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
                <label className="text-lg font-semibold text-gray-800">
                  Tên sản phẩm
                </label>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Bắt buộc nhập tên sản phẩm!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    className="text-gray-700 p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </Form.Item>
              </div>

              {/* Mô tả sản phẩm */}
              <div>
                <label className="text-lg font-semibold text-gray-800">
                  Mô tả sản phẩm
                </label>
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
                <label className="text-lg font-semibold text-gray-800">
                  Ảnh sản phẩm
                </label>
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
                <label className="text-lg font-semibold text-gray-800">
                  Danh mục
                </label>
                <Form.Item
                  name="category"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục!" },
                  ]}
                >
                  <Select
                    className="w-full rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                    placeholder="Chọn danh mục"
                  >
                    {activeCategories.map((categoryID: Icategory) => (
                      <Select.Option
                        key={categoryID._id}
                        value={categoryID._id}
                      >
                        {categoryID.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              {/* Chất liệu */}
              <div>
                <label className="text-lg font-semibold text-gray-800">
                  Chất liệu
                </label>
                <Form.Item
                  name="material"
                  rules={[
                    { required: true, message: "Vui lòng chọn chất liệu!" },
                  ]}
                >
                  <Select
                    className="w-full rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                    placeholder="Chọn chất liệu"
                  >
                    {activeMaterial.map((materialID: Icategory) => (
                      <Select.Option
                        key={materialID._id}
                        value={materialID._id}
                      >
                        {materialID.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Biến thể sản phẩm */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Biến thể sản phẩm
            </h3>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <Form.Item
                  name={`size-${index}`}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập kích thước sản phẩm!",
                    },
                  ]}
                  className="w-1/4"
                >
                  <Input
                    placeholder="Kích thước"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                  />
                </Form.Item>

                <Form.Item
                  name={`quantity-${index}`}
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng!" },
                  ]}
                  className="w-1/4"
                >
                  <Input
                    type="number"
                    placeholder="Số lượng"
                    value={variant.quantity}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9]*$/.test(value)) {
                        handleVariantChange(
                          index,
                          "quantity",
                          value === "" ? 0 : Number(value)
                        );
                      }
                    }}
                    className="p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                  />
                </Form.Item>

                <Form.Item
                  name={`price-${index}`}
                  rules={[
                    { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                  ]}
                  className="w-1/4"
                >
                  <Input
                    type="number"
                    placeholder="Giá"
                    value={variant.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9]*$/.test(value)) {
                        const numericValue = value === "" ? 0 : Number(value);
                        if (numericValue >= 0) {
                          handleVariantChange(index, "price", numericValue);
                        }
                      }
                    }}
                    className="p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                  />
                </Form.Item>

                <Form.Item name={`discount-${index}`} className="w-1/4">
                  <Input
                    type="number"
                    placeholder="Giảm giá (VND)"
                    value={variant.discount || 0}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9]*$/.test(value)) {
                        const numericValue = value === "" ? 0 : Number(value);
                        if (numericValue >= 0) {
                          handleVariantChange(index, "discount", numericValue);
                        }
                      }
                    }}
                    className="p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600"
                  />
                </Form.Item>
                {/* ... existing JSX ... */}
                {/* <div className="mt-6 text-lg font-semibold text-gray-800">
                  Tổng giá: {totalPrice.toLocaleString()} VND
                </div> */}
                {/* ... existing JSX ... */}

                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="bg-red-600 text-white rounded-lg px-4"
                >
                  Xóa
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVariant}
              className="bg-blue-600 text-white rounded-lg px-4"
            >
              Thêm biến thể
            </button>
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
