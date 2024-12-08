import React, { useEffect, useState } from "react";
import { Form, Input, Upload, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { getPostById, updatePost } from "../../../service/new";

const UpdateNews = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<string>(); // Chỉ định kiểu `id` là `string | undefined`
  const [images, setImages] = useState<string[]>([]); // Các hình ảnh hiện có
  const [fileList, setFileList] = useState<any[]>([]); // Các tệp tải lên mới

  // Hàm tiện ích để hiển thị thông báo
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

  // Lấy dữ liệu bài viết khi component được gắn vào DOM
  useEffect(() => {
    if (!id) {
      showNotification("error", "Lỗi", "ID bài viết bị thiếu.");
      return;
    }
  
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        if (post) {
          setImages(post.img || []);
          form.setFieldsValue({
            title: post.title,
            descriptions: post.descriptions,
            content: post.content,
          });
        } else {
          showNotification("error", "Lỗi", "Không tìm thấy bài viết.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể lấy chi tiết bài viết, vui lòng thử lại!"
        );
      }
    };
  
    fetchPost();
  }, [id, form]);
  const onFinish = async (values: any) => {
    if (!id) {
      showNotification("error", "Lỗi", "ID bài viết bị thiếu.");
      return;
    }
  
    try {
        const newImages = fileList.map((file) => file.url || file.response.url);
        const updatedPost = {
          ...values,
          img: [...images, ...newImages],
        };
        
  
        const updatedPostData = await updatePost(id, updatedPost);
        console.log(updatedPostData); // Kiểm tra phản hồi từ API
        if (updatedPostData) {
          showNotification("success", "Cập nhật bài viết thành công!", `Tiêu đề: ${updatedPost.title}`);
          navigate("/admin/tintuc");
        } else {
          showNotification("error", "Lỗi", "Không thể cập nhật bài viết, vui lòng thử lại!");
        }
        
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      showNotification("error", "Lỗi", "Không thể cập nhật bài viết, vui lòng thử lại!");
    }
  };
  

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-6 font-[sans-serif]">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Cập nhật Tin tức</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        {/* Tiêu đề */}
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
          <Input placeholder="Nhập tiêu đề tin tức" className="rounded" />
        </Form.Item>

        {/* Mô tả */}
        <Form.Item
          label="Mô tả"
          name="descriptions"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
          <Input.TextArea rows={4} placeholder="Nhập mô tả" className="rounded" />
        </Form.Item>

        {/* Nội dung */}
        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
          <Input.TextArea rows={6} placeholder="Nhập nội dung" className="rounded" />
        </Form.Item>

        {/* Hình ảnh */}
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-800">Hình ảnh</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {images.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img}
                  alt={`Hình ảnh ${index}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1"
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <Upload
            action="/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            maxCount={3}
          >
            <UploadOutlined />
            Tải lên
          </Upload>
        </div>

        <Form.Item>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateNews;
