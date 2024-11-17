const OrderItem = ({}) => {
    return (
      <div className="p-4 border rounded-lg shadow-md flex justify-between items-center mb-4 bg-white">
        <div>
          <h2 className="text-lg font-semibold">Mã đơn hàng: {}</h2>
          <p>Tên sản phẩm: {}</p>
          <p>Số lượng: {}</p>
        </div>
        <div>
          <p className="text-right font-bold">Tổng giá: ${}</p>
        </div>
      </div>
    );
  };
  
  export default OrderItem;