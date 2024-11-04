import React from 'react';

function OrderPayment() {
  


  return (
    <div className="flex  py-10">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Thông tin nhận hàng</h2>
        
        {/* Shipping Information Form */}
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
           
            className="w-full border rounded-lg p-3"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại (tùy chọn)"
           
            className="w-full border rounded-lg p-3"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ (tùy chọn)"
            
            className="w-full border rounded-lg p-3"
          />

          {/* Dropdowns for city, district, and ward */}
          <select
            name="city"
           
            className="w-full border rounded-lg p-3"
          >
            <option value="">Tỉnh thành</option>
            {/* Add options for cities */}
          </select>

          <select
            name="district"
           
            className="w-full border rounded-lg p-3"
          >
            <option value="">Quận huyện (tùy chọn)</option>
            {/* Add options for districts */}
          </select>

          <select
            name="ward"
           
            className="w-full border rounded-lg p-3"
          >
            <option value="">Phường xã (tùy chọn)</option>
            {/* Add options for wards */}
          </select>

          <textarea
            name="notes"
            placeholder="Ghi chú (tùy chọn)"
           
            className="w-full border rounded-lg p-3"
          ></textarea>
        </div>

        {/* Payment and Order Summary */}
        
      </div>
      
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Đơn hàng (1 sản phẩm)</h2>

      {/* Product Information */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src="product_image_url" // Replace with actual image URL
            alt="Product"
            className="w-16 h-16 rounded-md mr-4"
          />
          <span>PG UNLEASHED 1/60 RX-78-2 GUNDAM</span>
        </div>
        <span className="font-semibold">6.000.000₫</span>
      </div>

      {/* Discount Code Input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          className="border p-2 rounded-lg w-full mr-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Áp dụng</button>
      </div>

      {/* Price Details */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>6.000.000₫</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>-</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Tổng cộng</span>
          <span>6.000.000₫</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between items-center">
        <a href="#" className="text-blue-500">Quay về giỏ hàng</a>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">ĐẶT HÀNG</button>
      </div>
    </div>
    </div>
  );
}

export default OrderPayment;