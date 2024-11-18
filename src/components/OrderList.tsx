import React from 'react';
import OrderItem from './OrderItem';

const orders = [
  { id: '12345', productName: 'Sản phẩm A', quantity: 2, totalPrice: 400 },
  { id: '12346', productName: 'Sản phẩm B', quantity: 1, totalPrice: 200 },
  { id: '12347', productName: 'Sản phẩm C', quantity: 3, totalPrice: 600 },
];

const OrderList = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h1>
      {orders.map((order) => (
        <OrderItem key={order.id}  />
      ))}
    </div>
  );
};

export default OrderList;