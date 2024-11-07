import React from 'react'

interface Props {
    
}

const Donhang = (props: Props) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 bg-gray-100">
        {/* Left Column */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Địa chỉ giao hàng</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Họ và tên *</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập họ tên" />
              </div>
              <div>
                <label className="block text-sm font-medium">Số điện thoại *</label>
                <input type="tel" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập số điện thoại" />
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Địa chỉ email *</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập email" />
              </div>
              <div>
                <label className="block text-sm font-medium">Địa chỉ *</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 p-2 rounded-md" placeholder="Nhập địa chỉ" />
              </div>
            </div>
  
            
  
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Create an account?</span>
              </label>
            </div>
  
            <div className="mt-4">
              <h3 className="text-lg font-bold">Thông tin thêm</h3>
              <textarea className="mt-2 block w-full border border-gray-300 p-2 rounded-md" rows={4} placeholder="Lưu ý cho đơn hàng"></textarea>
            </div>
          </form>
  
          <h2 className="text-lg font-bold mt-8">Phương thức thanh toán</h2>
          <div className="flex gap-4 mt-4">
            <button className="w-full border border-gray-300 p-4 rounded-md flex items-center justify-center hover:bg-gray-100">
              <span className="text-lg font-medium">Chuyển khoản ngân hàng</span>
            </button>
            <button className="w-full border border-gray-300 p-4 rounded-md flex items-center justify-center hover:bg-gray-100">
              <span className="text-lg font-medium">Thanh toán khi nhận hàng</span>
            </button>
          </div>
  
          <div className="mt-4">
            <h3 className="text-sm font-bold">Ngân hàng Vietcombank</h3>
            <p>Số tài khoản: 0071000745809</p>
            <p>Tên chủ tài khoản: CT CP NOI THAT AKA VIETCOMBANK – CHI NHÁNH TP.HCM</p>
          </div>
        </div>
  
        {/* Right Column */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Thành tiền</span>
              <span>33,650,000₫</span>
            </div>
            <div className="flex justify-between">
              <span>Vận chuyển</span>
              <span>Miễn phí vận chuyển</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span>33,650,000₫</span>
            </div>
            <div className="mt-4">
              
              
            </div>
            <button className="w-full bg-black text-white p-3 rounded-md font-bold mt-4">Đặt mua</button>
          </div>
        </div>
      </div>
    )
}

export default Donhang
