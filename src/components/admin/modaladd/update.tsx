import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getProductByID, updateProduct } from "../../../service/products";
import { Iproduct } from "../../../interface/products";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../../service/category";
import { Icategory } from "../../../interface/category";

type Props = {};

const Update = (props: Props) => {
    const [categories, setCategories] = useState<Icategory[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductByID(id);
                form.setFieldsValue({
                    name: response.name,
                    price: response.price,
                    img: response.img,
                    soLuong: response.soLuong,
                    moTa: response.moTa,
                    category: response.category?._id,
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data || response);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id, form]);

    const onFinish = async (values: Iproduct) => {
        try {
            await updateProduct(id, values);
            alert("Product updated successfully!");
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6 font-[sans-serif]">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Update Product</h2>
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
                    rules={[{ required: true, message: "Please enter the product name" }]}
                >
                    <Input placeholder="Enter product name" className="rounded" />
                </Form.Item>

                {/* Price */}
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Please enter the product price" }]}
                >
                    <Input type="number" placeholder="Enter price in $" className="rounded" />
                </Form.Item>

                {/* Quantity */}
                <Form.Item
                    label="Quantity"
                    name="soLuong"
                    rules={[{ required: true, message: "Please enter the quantity" }]}
                >
                    <Input type="number" placeholder="Enter quantity" className="rounded" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    label="Description"
                    name="moTa"
                    rules={[{ required: true, message: "Please enter a description" }]}
                >
                    <Input.TextArea placeholder="Enter product description" rows={4} className="rounded" />
                </Form.Item>

                {/* Category */}
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Please select a category" }]}
                >
                    <Select placeholder="Select category" className="rounded">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <Select.Option key={category._id} value={category._id}>
                                    {category.name}
                                </Select.Option>
                            ))
                        ) : (
                            <Select.Option disabled>Loading categories...</Select.Option>
                        )}
                    </Select>
                </Form.Item>

                {/* Image */}
                <Form.Item
                    label="Image URL"
                    name="img"
                    rules={[{ required: true, message: "Please enter the image URL" }]}
                >
                    <Input placeholder="Enter image URL" className="rounded" />
                </Form.Item>

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
