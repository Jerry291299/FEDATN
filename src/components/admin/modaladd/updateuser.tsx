import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { IUser } from "../../../interface/user";
import { getUserById, updateUser } from "../../../service/user";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const UpdateUser = (props: Props) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with ID:", id);
        const response = await getUserById(id);
        console.log("Response from getUserById:", response);
        if (response) {
          setUser(response);
          form.setFieldsValue({ role: response.role }); // Initialize form with user role
        } else {
          console.error("User data not found for ID:", id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        messageApi.error("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, [id, form, messageApi]);

  const onFinish = async (values: any) => {
    try {
      const roleToUpdate = values.role || "Default Role";

      if (id && roleToUpdate) {
        const updatedUser = await updateUser(id, roleToUpdate);
        if (updatedUser) {
          message.success("Cập nhật vai trò người dùng thành công");
          form.resetFields();
          navigate("/admin/users");
        } else {
          message.error("Không thể cập nhật người dùng");
        }
      } else {
        console.error("Vai trò hoặc ID không được xác định.");
      }
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.message ||
          "Lỗi máy chủ: Không thể cập nhật người dùng."
        : "Lỗi máy chủ: Không thể cập nhật người dùng.";
      message.error(errorMessage);
    }
  };

  // validateRole đúng định dạng
  const validateRole = (rule: any, value: string) => {
    if (value && !["user", "admin", "shipper"].includes(value.toLowerCase())) {
      return Promise.reject("Role phải là 'user', 'admin' hoặc 'shipper'");
    }
    return Promise.resolve();
  };

  return (
    <div className="pt-[20px] px-[30px]">
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
        {user && (
          <div>
            <h2 className="text-xl font-bold">User Information</h2>
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>User Name:</strong> {user.name}
            </p>
            <p>
              <strong>User Role:</strong> {user.role}
            </p>
          </div>
        )}
        <Form form={form} onFinish={onFinish}>
          <div>
            <label className="mb-2 text-2xl text-black block">User Role:</label>
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vai trò người dùng!",
                },
                {
                  validator: validateRole,
                },
              ]}
            >
              <Input
                className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                placeholder="Enter User Role"
              />
            </Form.Item>
          </div>
          <button
            type="submit"
            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Role
          </button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
