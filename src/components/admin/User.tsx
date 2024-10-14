import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteProduct, getAllproducts } from '../../service/products';
import { Iproduct } from '../../interface/products';
import { Popconfirm } from 'antd';
import { getAllusers } from '../../service/user';
import { IUser } from '../../interface/user';

type Props = {}

const Users = (props: Props) => {

  const [users, setUser] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

  console.log(param);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllusers();
        setUser(data);
        console.log(data,  "data");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
    
  }, []);

  // const delProduct = async (id: string) => {
  //   await DeleteProduct(id);
  //   const newusers = users.filter(
  //     (user: IUser) => user.id !== id
  //   );
  //   console.log(id);
  //   getAllusers(newusers);
  // };

  // const updateProduct = (id: string) => {
  //   navigate(`update/${id}`);
  // };
  return (
    <>
    <div className="flex flex-col w-full">
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
                Họ và Tên
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
              </th>
            
              {/* <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Ảnh
              </th> */}
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Handle
              </th>
            </tr>
          </thead>
          <tbody>
          {users.map((user: IUser, index: number) => (
            <tr  className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {index + 1}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.email}
              </td>
             
              {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <img className='w-[100px]' src={user?.img} alt="" />
              </td> */}
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <button
                      // onClick={() => updateProduct(user._id)}
                      type="button"
                      className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                    >
                      Edit
                    </button>
                <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        // delProduct(product._id);
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

  
export default Users