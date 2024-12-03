import React, { useEffect, useState } from "react";
import { Form, Input, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryByID, updateCategory } from "../../../service/category";
import { Icategory } from "../../../interface/category";

const Updatecategory = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  // Utility function for notifications
  const showNotification = (
    type: "success" | "error",
    message: string,
    description?: string
  ) => {
    notification[type]({
      message,
      description,
      placement: "topRight", // You can adjust the placement: 'topLeft', 'topRight', etc.
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryByID(id);
        form.setFieldsValue({
          name: response.name,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
        showNotification(
          "error",
          "Lỗi",
          "Không thể tải danh mục, vui lòng thử lại!"
        );
      }
    };
    fetchCategory();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      const updatedCategory = await updateCategory(id, values);

      if (updatedCategory) {
        showNotification(
          "success",
          "Danh mục cập nhật thành công!",
          `Tên danh mục mới: ${updatedCategory.name}`
        );
        navigate("/admin/Listcategory");
      } else {
        showNotification(
          "error",
          "Lỗi",
          "Cập nhật danh mục thất bại, vui lòng thử lại!"
        );
      }
    } catch (error) {
      console.error("Error updating category:", error);
      showNotification(
        "error",
        "Lỗi máy chủ",
        "Không thể cập nhật danh mục, vui lòng liên hệ quản trị viên!"
      );
    }
  };

  return (
    <>
      <div className="pt-[20px] px-[30px]">
        <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
          <Form form={form} onFinish={onFinish}>
            <div>
              <label className="mb-2 text-2xl text-black block">
                Tên danh mục:
              </label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên danh mục!",
                  },
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
              Sửa Danh Mục
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Updatecategory;
