import React, { useEffect, useState } from "react";
import { Popconfirm, message } from "antd";
import { getAllusers, activateUser, deactivateUser } from "../../service/user";
import { IUser } from "../../interface/user";
import LoadingComponent from "../Loading";
import { NavLink } from "react-router-dom";

type Props = {};

const Users = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllusers();
        setUser(data);
        console.log(data, "data");

        localStorage.setItem("users", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUser(JSON.parse(storedUsers));
    } else {
      fetchData();
    }
  }, []);

const deactivateUserById = async (_id: string) => {
  try {
    await deactivateUser(_id);
    message.success(`Người dùng với ID ${_id} đã được vô hiệu hóa.`);
    const updatedUsers = users.map((user) =>
      user._id === _id 
        ? { ...user, status: "deactive" as const, isActive: false }
        : user
    );
    
    console.log(`Updated User after Deactivation:`, updatedUsers.find(user => user._id === _id));
    
    setUser(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  } catch (error) {
    console.error("Error deactivating user:", error);
    message.error("Có lỗi xảy ra khi vô hiệu hóa người dùng.");
  }
};

const activateUserById = async (_id: string) => {
  try {
    await activateUser(_id);
    message.success(`Người dùng với ID ${_id} đã được kích hoạt lại.`);
    const updatedUsers = users.map((user) =>
      user._id === _id 
        ? { ...user, status: "active" as const, isActive: true }
        : user
    );

    console.log(`Updated User after Activation:`, updatedUsers.find(user => user._id === _id));
    
    setUser(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  } catch (error) {
    console.error("Error activating user:", error);
    message.error("Có lỗi xảy ra khi kích hoạt lại người dùng.");
  }
};

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <LoadingComponent />}
      
      
      <div className="flex flex-col w-full">
        <input
          type="text"
          placeholder="Tìm kiếm người dùng theo Họ và Tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mb-4"
        />
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Stt</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Họ và Tên</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Vai trò</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Trạng thái</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: IUser, index: number) => (
                      <tr className="bg-gray-100 border-b" key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.role}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.status === "deactive" ? (
                            <span className="text-red-600">Vô hiệu hóa</span>
                          ) : (
                            <span className="text-green-600">Hoạt động</span>
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {user.status === "active" ? (
                            <Popconfirm
                              title="Vô hiệu hóa người dùng"
                              description="Bạn có chắc chắn muốn vô hiệu hóa người dùng này không?"
                              onConfirm={() => deactivateUserById(user._id)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <button
                                type="button"
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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
                                className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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
                      <td colSpan={6} className="text-center text-gray-500 py-4">Không tìm thấy người dùng nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
