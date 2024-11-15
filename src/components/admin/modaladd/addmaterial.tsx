import React, { useState } from 'react';
import { Form, Input, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { addMaterial } from '../../../service/material';
import { IMaterial } from '../../../interface/material';

const AddMaterial = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const info = () => {
    messageApi.open({
      type: "success",
      content: "Material added successfully",
    });
  };

  const onFinish = async (values: any) => {
    try {
      const payload = { ...values };
      const material = await addMaterial(payload);

      if (material) {
        console.log("Added Material:", material);
        info();
        form.resetFields();
        navigate("/admin/Material"); // Điều hướng người dùng đến trang ListMaterial sau khi thêm thành công
      } else {
        messageApi.error("Failed to add material");
      }

    } catch (error) {
      console.error("Error adding material:", error);
      messageApi.error("Server Error: Could not add material.");
    }
  };

  return (
    <>
      <div className="pt-[20px] px-[30px]">
        <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
          <Form form={form} initialValues={{ material: "1" }} onFinish={onFinish}>
            <div>
              <label className="mb-2 text-2xl text-black block">
                Material name:
              </label>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input the material name!" },
                ]}
              >
                <Input
                  className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                  placeholder="Enter Material name"
                />
              </Form.Item>
            </div>
         
            <button
              type="submit"
              className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add New Material
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddMaterial;