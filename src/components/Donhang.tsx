import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface Props {
    
}

const Donhang = (props: Props) => {
    return (
      <>
      <Header />
      <div className="flex flex-col items-center p-4 lg:p-8 bg-gray-100">
      {/* Notification Section */}
      <div className="text-center bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl w-full">
        <p className="text-sm">
          Cảm ơn bạn đã mua sắm tại Nhà Xinh. Đơn hàng #<span className="font-bold">63809</span>
        </p>
        <p className="text-sm mt-2">
          Tổng giá trị là <span className="font-bold">33,650,000₫</span>, dự kiến giao hàng trong vòng 2-7 ngày đối với hàng có sẵn tại khu vực.
          Cần thêm thông tin Quý khách vui lòng liên hệ Hotline: <span className="font-bold">18007020</span>
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-100">Tiếp tục mua hàng</button>
          
        </div>
      </div>

      {/* Order Details Section */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-4xl w-full">
        {/* Left Column - Order Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Chi tiết đơn hàng</h2>
          <div className="flex items-center gap-4 border-b border-gray-300 pb-4 mb-4">
            <img src="https://nhaxinh.com/wp-content/uploads/2024/03/giuong-leman-1m8-111430-2-300x200.jpg
            " alt="Product" className="w-20 h-20 object-cover rounded" />
            <div>
              <p className="font-semibold">Giường Leman 1m8 vải VACT77464 x 1</p>
              <p className="text-gray-500 font-medium">33,650,000₫</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Thành tiền:</span>
              <span className="font-medium">33,650,000₫</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-medium">Miễn phí vận chuyển</span>
            </div>
            <div className="flex justify-between">
              <span>Phương thức thanh toán:</span>
              <span className="font-medium">Chuyển khoản ngân hàng</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng:</span>
              <span>33,650,000₫</span>
            </div>
          </div>
        </div>

        {/* Right Column - Order Info */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-green-600">Cảm ơn. Đơn hàng của bạn đã được tiếp nhận</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Số đơn hàng:</span>
              <span className="font-medium">63809</span>
            </div>
            <div className="flex justify-between">
              <span>Ngày:</span>
              <span className="font-medium">7 November, 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng cộng:</span>
              <span className="font-medium">33,650,000₫</span>
            </div>
            <div className="flex justify-between">
              <span>Phương thức thanh toán:</span>
              <span className="font-medium">Chuyển khoản ngân hàng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
    )
}

export default Donhang
