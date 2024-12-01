import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import LoadingComponent from "../../Loading";
import { upload } from "../../../service/upload";
import { createPost } from "../../../service/new";

const AddNews = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

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
                title: values.title,
                descriptions: values.descriptions,
                content: values.content,
                img: imageUrls, // Array of image URLs
            };

            console.log("Payload:", payload);

            await createPost(payload);
            message.success("News added successfully!");
            form.resetFields();
            setFiles([]);
            setPreviews([]);
        } catch (error) {
            console.error("Error adding news:", error);
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
                            Tiêu đề:
                        </label>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc nhập tiêu đề!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter news title" />
                        </Form.Item>
                    </div>

                    <div>
                        <label className="mb-2 text-2xl text-black block">
                            Mô tả:
                        </label>
                        <Form.Item
                            name="descriptions"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc nhập mô tả!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter news description" />
                        </Form.Item>
                    </div>

                    <div>
                        <label className="mb-2 text-2xl text-black block">
                            Nội dung:
                        </label>
                        <Form.Item
                            name="content"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc nhập nội dung!",
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Enter content" />
                        </Form.Item>
                    </div>

                    <div>
                        <label className="mb-2 text-sm text-black block">
                            Ảnh bài viết:
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
                        <Input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Thêm mới bài viết
                    </button>
                </Form>
            </div>
        </>
    );
};

export default AddNews;
