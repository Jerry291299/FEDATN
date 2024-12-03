import React, { useState } from 'react';
import { Form, Input, notification } from "antd";
import { useNavigate } from 'react-router-dom';
import { addCategory } from '../../../service/category';
import { Icategory } from '../../../interface/category';

type Props = {};

const Addcategory = (props: Props) => {
  const [category, setCategory] = useState<Icategory[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openNotification = (type: "success" | "error", message: string, description: string) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
      };

      const category = await addCategory(payload);
      setCategory([category]); // Cập nhật danh mục mới

      openNotification("success", "Thành công", "Danh mục đã được thêm thành công!");
      form.resetFields();
    } catch (error) {
      console.error("Error adding category:", error);
      openNotification("error", "Lỗi", "Không thể thêm danh mục. Vui lòng thử lại.");
    }
  };

  return (
    <div className="pt-[20px] px-[30px]">
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        <Form form={form} initialValues={{ category: "1" }} onFinish={onFinish}>
          <div>
            <label className="mb-2 text-2xl text-black block">
              Tên danh mục:
            </label>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên danh mục!" },
              ]}
            >
              <Input
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                placeholder="Nhập tên danh mục"
              />
            </Form.Item>
          </div>
          <button
            type="submit"
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thêm mới danh mục
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Addcategory;
