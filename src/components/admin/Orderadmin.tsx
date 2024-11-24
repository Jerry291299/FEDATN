import React, { useEffect, useState } from 'react';
import { axiosservice } from '../../config/API';
import { IOrder } from '../../interface/order';

interface Props {}

const Order = (props: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]); // Trạng thái lưu danh sách đơn hàng
  const [loading, setLoading] = useState<boolean>(true);

  // Hàm định dạng tiền tệ VNĐ
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Gọi API lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosservice.get('/orders'); // API endpoint
        setOrders(response.data); // Lưu danh sách đơn hàng vào state
        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mb-[20px] flex flex-col w-full">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block w-full px-0">
          <div className="overflow-hidden">
            {loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">STT</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Mã đơn</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Địa chỉ</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Đơn hàng</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Giá trị đơn hàng</th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Trạng thái đơn hàng</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id} className="bg-gray-100 border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{order._id}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{order.customerDetails.email}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{order.customerDetails.address}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {order.items.map((item) => (
                          <div key={item.name}>
                             {item.name} x {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{formatCurrency(order.totalAmount)}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <form action="" method="post">
                          <select name="trangthai" id="trangthai" className="border border-gray-300 rounded p-1">
                            <option value="0" selected={order.status === 'Đơn hàng mới'}>
                              Đơn hàng mới
                            </option>
                            <option value="1" selected={order.status === 'Đang xử lí'}>
                              Đang xử lí
                            </option>
                            <option value="2" selected={order.status === 'Đang giao hàng'}>
                              Đang giao hàng
                            </option>
                            <option value="3" selected={order.status === 'Đã giao hàng'}>
                              Đã giao hàng
                            </option>
                            <option value="4" selected={order.status === 'Hủy'}>
                              Hủy
                            </option>
                          </select>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
