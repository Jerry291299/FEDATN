import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../service/category";
import { Icategory } from "../../../interface/category";

type Props = {};

const Addcategory = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [messageApi] = message.useMessage();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const info = () => {
    messageApi.open({
      type: "success",
      content: "Thêm danh mục thành công",
    });
  };

  const onFinish = async (values: any) => {
    try {
      const payload = { ...values };
      const category = await addCategory(payload);

      if (category) {
        setName("");
        info();
        message.success("Thêm Danh Mục thành công!");

        form.resetFields();
        navigate("/admin/Listcategory"); // Quay lại trang danh sách danh mục
      } else {
        message.error("Không thể thêm danh mục");
      }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      message.error("Lỗi máy chủ: Không thể thêm danh mục.");
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
              Thêm mới Danh Mục
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Addcategory;
