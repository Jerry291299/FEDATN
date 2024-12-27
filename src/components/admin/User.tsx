import React, { useEffect, useState } from "react";
import { Popconfirm, message, Pagination, Input, Modal,Select } from "antd";
import {
  getAllusersAccount,
  activateUser,
  deactivateUser,
} from "../../service/user";
import { IUser } from "../../interface/user";
import LoadingComponent from "../Loading";
import { useNavigate } from "react-router-dom";

type Props = {};

const Users = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [reason, setReason] = useState<string>("");
  const navigate = useNavigate();
  const { TextArea } = Input;
  const { Option } = Select;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllusersAccount();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deactivateUserById = async (id: string) => {
    let selectedReasonLocal = "";
    let tempReason = "";
  
    Modal.confirm({
      title: "Vô hiệu hóa người dùng",
      content: (
        <>
          <p>Vui lòng chọn lý do hoặc nhập lý do mới:</p>
          <Select
            style={{ width: "100%", marginBottom: 10 }}
            placeholder="Chọn lý do"
            onChange={(value: string) => {
              selectedReasonLocal = value;
            }}
            allowClear
          >
            <Option value="Vi phạm chính sách">Vi phạm chính sách</Option>
            <Option value="Yêu cầu từ người dùng">Yêu cầu từ người dùng</Option>
            <Option value="Hoạt động bất thường">Hoạt động bất thường</Option>
          </Select>
          <Input.TextArea
            rows={4}
            placeholder="Hoặc nhập lý do tùy chỉnh"
            onChange={(e) => (tempReason = e.target.value)}
          />
        </>
      ),
      onOk: async () => {
        const finalReason = selectedReasonLocal || tempReason.trim();
        if (!finalReason) {
          message.error("Vui lòng chọn hoặc nhập lý do.");
          return Promise.reject(); // Ngăn modal đóng
        }
  
        try {
          await deactivateUser(id, finalReason);
          message.success(`Người dùng với ID ${id} đã được vô hiệu hóa.`);
  
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, active: false, reason: finalReason } : user
            )
          );
        } catch (error) {
          console.error("Error deactivating user:", error);
          message.error("Có lỗi xảy ra khi vô hiệu hóa người dùng.");
        }
      },
    });
  };
  

  const activateUserById = async (_id: string) => {
    try {
      await activateUser(_id);
      message.success(`Người dùng với ID ${_id} đã được kích hoạt lại.`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === _id ? { ...user, active: true } : user
        )
      );
    } catch (error) {
      console.error("Error activating user:", error);
      message.error("Có lỗi xảy ra khi kích hoạt lại người dùng.");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  return (
    <>
      {loading && <LoadingComponent />}

      <div className="flex flex-col w-full p-6 bg-gray-50">
        <Input
          placeholder="Tìm kiếm người dùng theo Họ và Tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-3 mb-6"
          style={{ maxWidth: "400px" }}
        />

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden bg-white rounded-lg">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                  <tr>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Stt
                    </th>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Họ và Tên
                    </th>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Email
                    </th>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Vai trò
                    </th>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Trạng thái
                    </th>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Lý do vô hiệu hóa
                    </th>
                    <th className="text-sm font-medium text-white px-6 py-4 text-left">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user: IUser, index: number) => (
                      <tr
                        className="bg-gray-100 border-b hover:bg-gray-200"
                        key={user._id}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1 + (currentPage - 1) * pageSize}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.role}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.active ? (
                            <span className="text-green-600">Hoạt động</span>
                          ) : (
                            <span className="text-red-600">Vô hiệu hóa</span>
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.reason && !user.active ? (
                            <span className="text-gray-700">{user.reason}</span>
                          ) : (
                            "Không có"
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.active ? (
                            <Popconfirm
                              title="Vô hiệu hóa người dùng"
                              description="Bạn có chắc chắn muốn vô hiệu hóa người dùng này không?"
                              onConfirm={() => deactivateUserById(user._id)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <button
                                type="button"
                                className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                              >
                                Deactivate
                              </button>
                            </Popconfirm>
                          ) : (
                            <Popconfirm
                              title="Kích hoạt lại người dùng"
                              description="Bạn có chắc chắn muốn kích hoạt lại người dùng này không?"
                              onConfirm={() => activateUserById(user._id)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <button
                                type="button"
                                className="focus:outline-none text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                              >
                                Activate
                              </button>
                            </Popconfirm>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center text-gray-500 py-4"
                      >
                        Không tìm thấy người dùng nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredUsers.length}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="mt-4"
        />
      </div>
    </>
  );
};

export default Users;
