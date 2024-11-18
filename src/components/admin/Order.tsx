import React from 'react'

interface Props {
    
}

const Order = (props: Props) => {
    return (
        <>
      <div className="mb-[20px] flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Stt</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Mã đơn</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Địa chỉ </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Đơn hàng</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Giá trị đơn hàng </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Trạng thái đơn hàng </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100 border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">45672</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Hoaian12@gmail.com</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Hà Nội</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">ghế sofa</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">100.000</td>
                    
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <form action="" method="post">
                        <select name="trangthai" id="trangthai" className="border border-gray-300 rounded p-1">
                          <option value="0">Đơn hàng mới</option>
                          <option value="1">Đang xử lí</option>
                          <option value="2">Đang giao hàng</option>
                          <option value="3">Đã giao hàng</option>
                          <option value="4">Hủy</option>
                        </select>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default Order
