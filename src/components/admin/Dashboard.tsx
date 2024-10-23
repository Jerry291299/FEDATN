import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { DeleteProduct, getAllproducts } from '../../service/products';
import { Iproduct } from '../../interface/products';
import { Icategory } from '../../interface/category';
import { Popconfirm } from 'antd';
import LoadingComponent from '../Loading';

type Props = {}

const Dashboard = (props: Props) => {

  const [products, setProduct] = useState([]);
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  console.log(param);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const data = await getAllproducts();
        setProduct(data);
        console.log(data, "data");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const delProduct = async (id: string) => {
    await DeleteProduct(id);
    const newproduct = products.filter(
      (product: Iproduct) => product._id !== id
    );
    console.log(id);
    setProduct(newproduct);
  };

  const updateProduct = (id: string) => {
    navigate(`update/${id}`);
  };
  return (
    <>
    {loading && <LoadingComponent />}
    <NavLink to={'/admin/add'}><button className=' focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 '>thêm mới</button></NavLink>
    
    <div className=" mb-[20px] flex flex-col w-full">
  <div className="overflow-x-auto">
    <div className="py-2 inline-block w-full px-0">
      <div className="overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-white border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stt
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tên Sản Phẩm
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Giá
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Danh mục
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Ảnh
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Handle
              </th>
            </tr>
          </thead>
          <tbody>
          {products.map((product: Iproduct, index: number) => (
            <tr  className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {product.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {product.price}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {product?.category?.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <img className='w-[100px]' src={product?.img} alt="" />
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button
                      onClick={() => updateProduct(product._id)}
                      type="button"
                      className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Edit
                    </button>
                <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        delProduct(product._id);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </Popconfirm>            
                      </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

      
    </>
  );
};

  
export default Dashboard