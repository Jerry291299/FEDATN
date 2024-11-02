import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { NavLink, useNavigate } from 'react-router-dom';
import { deactivateCategory, activateCategory, getAllCategories } from '../../service/category';
=======
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { delCategory, getAllCategories } from '../../service/category';
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
import { Icategory } from '../../interface/category';
import { Popconfirm } from 'antd';
import LoadingComponent from '../Loading';

<<<<<<< HEAD
const Listcategory = () => {
  const [categories, setCategory] = useState<Icategory[]>([]); // Khởi tạo là mảng rỗng
  const [searchTerm, setSearchTerm] = useState('');
=======
type Props = {}

const Listcategory = (props: Props) => {
  const [categories, setCategory] = useState<Icategory[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái cho ô tìm kiếm
  const param = useParams();
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        console.log(data); // Kiểm tra dữ liệu
        setCategory(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleDeactivateCategory = async (id: string) => {
    try {
<<<<<<< HEAD
      await deactivateCategory(id);
      const updatedCategories = categories.map((category) =>
        category._id === id ? { ...category, status: 'deactive' as 'deactive' } : category
      );
=======
      await delCategory(id);
      const updatedCategories = categories.filter((category) => category._id !== id);
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
      setCategory(updatedCategories);
      console.log(`Category with id ${id} deactivated successfully`);
    } catch (error) {
      console.log("Error deactivating category:", error);
    }
  };

  const handleActivateCategory = async (id: string) => {
    try {
      await activateCategory(id);
      const updatedCategories = categories.map((category) =>
        category._id === id ? { ...category, status: 'active' as 'active' } : category
      );
      setCategory(updatedCategories);
      console.log(`Category with id ${id} activated successfully`);
    } catch (error) {
      console.log("Error activating category:", error);
    }
  };

  const updateCategory = (id: string) => {
    navigate(`updatecategory/${id}`);
  };

<<<<<<< HEAD
  // Kiểm tra categories có tồn tại và là mảng trước khi filter
  const filteredCategories = Array.isArray(categories) ? categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
=======
  // Hàm lọc danh mục theo tên
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6

  return (
    <>
      {loading && <LoadingComponent />}
      <NavLink to={'/admin/addcategory'}>
        <button className='focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Thêm mới</button>
      </NavLink>

<<<<<<< HEAD
=======
      {/* Ô tìm kiếm danh mục */}
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
      <input
        type="text"
        placeholder="Tìm kiếm danh mục"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
        className="border p-2 rounded mb-4"
=======
        className="border p-2 rounded mb-4" 
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
      />

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Stt</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Tên danh mục</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Trạng thái</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category: Icategory, index: number) => (
                      <tr className="bg-gray-100 border-b" key={category._id}>
<<<<<<< HEAD
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{category.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.status === 'active' ? (
                            <span className="text-green-600">Hoạt động</span>
                          ) : (
                            <span className="text-red-600">Vô hiệu hóa</span>
                          )}
=======
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.name}
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            onClick={() => updateCategory(category._id)}
                          >
                            Edit
                          </button>
<<<<<<< HEAD
                          {category.status === 'active' ? (
                            <Popconfirm
                              title="Vô hiệu hóa danh mục"
                              description="Bạn có chắc chắn muốn vô hiệu hóa danh mục này không?"
                              onConfirm={() => handleDeactivateCategory(category._id)}
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
                              title="Kích hoạt lại danh mục"
                              description="Bạn có chắc chắn muốn kích hoạt lại danh mục này không?"
                              onConfirm={() => handleActivateCategory(category._id)}
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
=======
                          <Popconfirm
                            title="Xóa danh mục"
                            description="Bạn có chắc chắn muốn xóa danh mục này không?"
                            onConfirm={() => handleDeleteCategory(category._id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                              Delete
                            </button>
                          </Popconfirm>
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
<<<<<<< HEAD
                      <td colSpan={4} className="text-center text-gray-500 py-4">Không tìm thấy danh mục nào.</td>
=======
                      <td colSpan={3} className="text-center text-gray-500 py-4">Không tìm thấy danh mục nào.</td>
>>>>>>> c3b020e81659a869d16cec34f7f2cdbbad99ccf6
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

export default Listcategory;