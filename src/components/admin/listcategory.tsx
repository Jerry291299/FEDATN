import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { delCategory, getAllCategories } from '../../service/category';
import { Icategory } from '../../interface/category';
import { Popconfirm } from 'antd';
import LoadingComponent from '../Loading';

type Props = {}

const Listcategory = (props: Props) => {
  const [categories, setCategory] = useState<Icategory[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái cho ô tìm kiếm
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategory(data);
        console.log(data, "data");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteCategory = async (id: string) => {
    try {
      await delCategory(id);
      const updatedCategories = categories.filter((category) => category._id !== id);
      setCategory(updatedCategories);
      console.log(`Category with id ${id} deleted successfully`);
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const updateCategory = (id: string) => {
    navigate(`updatecategory/${id}`);
  };

  // Hàm lọc danh mục theo tên
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <LoadingComponent />}
      <NavLink to={'/admin/addcategory'}>
        <button className='focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>Thêm mới</button>
      </NavLink>

      {/* Ô tìm kiếm danh mục */}
      <input
        type="text"
        placeholder="Tìm kiếm danh mục"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4" 
      />

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Stt
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Tên danh mục
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category: Icategory, index: number) => (
                      <tr className="bg-gray-100 border-b" key={category._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            onClick={() => updateCategory(category._id)}
                          >
                            Edit
                          </button>
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center text-gray-500 py-4">Không tìm thấy danh mục nào.</td>
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
