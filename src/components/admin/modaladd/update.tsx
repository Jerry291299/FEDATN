import { Form, Input, Select, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { getProductByID, updateProduct } from "../../../service/products";
import { Iproduct } from "../../../interface/products";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../../service/category";
import { Icategory } from "../../../interface/category";
import { UploadOutlined } from "@ant-design/icons";
import { IMaterial } from "../../../interface/material";
import { getAllMaterials } from "../../../service/material";

const Update = () => {
    const [categories, setCategories] = useState<Icategory[]>([]);
    const [materials, setMaterials] = useState<IMaterial[]>([]);

    const [images, setImages] = useState<string[]>([]); // Existing images
    const [fileList, setFileList] = useState<any[]>([]); // Newly uploaded files
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

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
        const fetchProduct = async () => {
            try {
                const response = await getProductByID(id);
                setImages(response.img || []); // Assuming img is an array of URLs
                form.setFieldsValue({
                    name: response.name,
                    price: response.price,
                    soLuong: response.soLuong,
                    moTa: response.moTa,
                    category: response.category?._id,
                });
            } catch (error) {
                console.error("Error fetching product:", error);
                showNotification(
                    "error",
                    "Lỗi",
                    "Không thể tải thông tin sản phẩm, vui lòng thử lại!"
                );
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data || response);
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
                const response = await getAllMaterials();
                setMaterials(response.data || response);
            } catch (error) {
                console.error("Error fetching categories:", error);
                showNotification(
                    "error",
                    "Lỗi",
                    "Không thể tải chat lieu, vui lòng thử lại!"
                );
            }
        };

        fetchProduct();
        fetchCategories();
        fetchMaterial();
    }, [id, form]);

    const activeCategories = categories.filter(
        (categorie) => categorie.status === "active"
    );

    const activeMaterials = materials.filter(
        (material) => material.status === "active"
    );
    const onFinish = async (values: Iproduct) => {
        try {
            const newImages = fileList.map(
                (file) => file.url || file.response.url
            );
            const updatedProduct = {
                ...values,
                img: [...images, ...newImages],
            };

            await updateProduct(id, updatedProduct);
            showNotification(
                "success",
                "Cập nhật sản phẩm thành công!",
                `Tên sản phẩm mới: ${updatedProduct.name}`
            );
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Error updating product:", error);
            showNotification(
                "error",
                "Lỗi",
                "Không thể cập nhật sản phẩm, vui lòng thử lại!"
            );
        }
    };
    const activeCategory = categories.filter(
        (category) => category.status === "active"
    );
    const handleUploadChange = ({ fileList: newFileList }: any) => {
        setFileList(newFileList);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6 font-[sans-serif]">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Update Product
            </h2>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
            >
                {/* Name */}
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the product name",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter product name"
                        className="rounded"
                    />
                </Form.Item>

                {/* Price */}
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the product price",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Enter price in $"
                        className="rounded"
                    />
                </Form.Item>

                {/* Quantity */}
                <Form.Item
                    label="Quantity"
                    name="soLuong"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the quantity",
                        },
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="Enter quantity"
                        className="rounded"
                    />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label="Description"
                    name="moTa"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a description",
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Enter product description"
                        rows={4}
                        className="rounded"
                    />
                </Form.Item>

                {/* Category */}
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        { required: true, message: "Please select a category" },
                    ]}
                >
                    <Select placeholder="Select category" className="rounded">
                        {activeCategory.map((category) => (
                            <Select.Option
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Material"
                    name="material"
                    rules={[
                        { required: true, message: "Please select a material" },
                    ]}
                >
                    <Select placeholder="Select material" className="rounded">
                        {activeMaterials.map((material) => (
                            <Select.Option
                                key={material._id}
                                value={material._id}
                            >
                                {material.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Images */}
                <div>
                    <label className="block mb-2 text-lg font-semibold text-gray-800">
                        Images
                    </label>
                    {/* Display existing images */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-24 h-24">
                                <img
                                    src={img}
                                    alt={`Image ${index}`}
                                    className="w-full h-full object-cover rounded"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Upload new images */}
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        action="YOUR_IMAGE_UPLOAD_ENDPOINT" // Replace with your backend endpoint
                    >
                        {fileList.length < 5 && <UploadOutlined />}
                    </Upload>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                >
                    Update Product
                </button>
            </Form>
        </div>
    );
};

export default Update;
