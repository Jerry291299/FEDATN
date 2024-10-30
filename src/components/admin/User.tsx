import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { getAllusers } from '../../service/user';
import { IUser } from '../../interface/user';
import LoadingComponent from '../Loading';

type Props = {}

const Users = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUser] = useState<IUser[]>([]);
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllusers();
        setUser(data);
        console.log(data, "data");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm lọc người dùng theo name
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <LoadingComponent />}
      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng theo Họ và Tên"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị searchTerm khi người dùng nhập
                className="border p-2 rounded mb-4" // Thêm một số kiểu cho input
              />
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Stt</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Họ và Tên</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Vai trò</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user: IUser, index: number) => (
                      <tr className="bg-gray-100 border-b" key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{user.role}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Popconfirm
                            title="Xóa người dùng"
                            description="Bạn có chắc chắn muốn xóa người dùng này không?"
                            onConfirm={() => {
                              // delProduct(user.id); // Uncomment để sử dụng
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                              Xóa
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-500 py-4">Không tìm thấy người dùng nào.</td>
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
