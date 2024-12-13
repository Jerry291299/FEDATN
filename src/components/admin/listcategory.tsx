import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { deactivateCategory, activateCategory, getAllCategories } from '../../service/category';
import { Icategory } from '../../interface/category';
import { Popconfirm, Pagination } from 'antd';
import LoadingComponent from '../Loading';
import { CSVLink } from 'react-csv';

type Props = {};

const Listcategory = (props: Props) => {
  const [categories, setCategory] = useState<Icategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeactivateCategory = async (id: string) => {
    try {
      await deactivateCategory(id);
      const updatedCategories = categories.map((category) =>
        category._id === id ? { ...category, status: 'deactive' as 'deactive' } : category
      );
      setCategory(updatedCategories);
    } catch (error) {
      console.error('Error deactivating category:', error);
    }
  };

  const handleActivateCategory = async (id: string) => {
    try {
      await activateCategory(id);
      const updatedCategories = categories.map((category) =>
        category._id === id ? { ...category, status: 'active' as 'active' } : category
      );
      setCategory(updatedCategories);
    } catch (error) {
      console.error('Error activating category:', error);
    }
  };

  const updateCategory = (id: string) => {
    navigate(`updatecategory/${id}`);
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  
  const csvData = filteredCategories.map((category) => ({
    ID: category._id,
    'Tên danh mục': category.name,
    'Trạng thái': category.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa',
  }));

  return (
    <>
      {loading && <LoadingComponent />}
      <NavLink to={'/admin/addcategory'}>
        <button className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Thêm mới
        </button>
      </NavLink>

      <CSVLink
        data={csvData}
        filename={'categories.csv'}
        className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        target="_blank"
      >
        Xuất file danh mục
      </CSVLink>

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
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Stt</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Tên danh mục</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Trạng thái</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.length > 0 ? (
                    paginatedCategories.map((category, index) => (
                      <tr className="bg-gray-100 border-b" key={category._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {startIndex + index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.status === 'active' ? (
                            <span className="text-green-600">Hoạt động</span>
                          ) : (
                            <span className="text-red-600">Vô hiệu hóa</span>
                          )}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            onClick={() => updateCategory(category._id)}
                          >
                            Edit
                          </button>
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
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-4">
                        Không tìm thấy danh mục nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Ant Design Pagination */}
              <div className="flex justify-center mt-4">
                <Pagination
                  current={currentPage}
                  total={filteredCategories.length}
                  pageSize={itemsPerPage}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listcategory;
