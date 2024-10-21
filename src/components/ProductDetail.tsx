import React from 'react'
import anh1 from './img/giuong-ngu-pio-1.jpg'
import anh6 from './img/sofa1.jpeg'
import anh7 from './img/sofa2.jpeg'
import anh16 from "./img/sofa4.jpeg"
import anh15 from "./img/sofa3.jpeg"
import anh13 from "./img/sofa5.jpeg"
import anh12 from "./img/sofa6.jpeg"
export const ProductDetail = () => {
    return (
        <>
        <div className='container mx-auto w-[1400px] pt-[100px]'>
        <div className='container mx-auto w-[1300px] flex' >
        <div className=''>
            <img className='mb-[20px] w-[150px]' src={anh1} alt="" />
            <img className='mb-[20px] w-[150px]' src={anh1} alt="" />
            <img className='mt-[10px] w-[150px]' src={anh1} alt="" />
            <img className='mt-[10px] w-[150px]' src={anh1} alt="" />
        </div>
        <div className='ml-[40px]'>
            <img className='w-[650px] object-cover' src={anh1} alt="" />
        </div>
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-black-800">RG 1/144 MSN-04 SAZABI</h1>
      <p className="font-bold text-gray-500">SKU: (ĐANG CẬP NHẬT...)</p>
      
      <div className="my-4">
        <div className="flex items-baseline">
          <span className="text-2xl font-semibold text-black-600">950.000₫</span>
         <p className=" text-gray-500 m-[15px]">Giá thị trường:<span className="text-gray-400 line-through ml-2">1.000.000₫</span></p>
        </div>
        <p className="font-bold text-gray-600">Tiết kiệm: <span className="text-red-600">50.000₫</span></p>
        <p className="font-bold text-gray-500 mt-2">Tình trạng: <span className="font-semibold text-red-600">Hết hàng</span></p>
      </div>

      <div className="flex items-center my-4">
        <p className="font-bold">Số Lượng</p>
        <button 
   
          className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
        >
          -
        </button>
        <input 
          type="text" 
      
          readOnly 
          className="w-12 text-center border border-gray-300"
        />
        <button 
        
          className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
        >
          +
        </button>
      </div>

      <button 
        className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg cursor-not-allowed"
        disabled
      >
        HẾT HÀNG
      </button>

      <div className="my-4 font-bold">
        <p className="text-gray-700">Gọi đặt mua: 
          <a href="tel:0829721097" className="text-blue-600"> 0829721097</a> 
          <span className="text-gray-600">(miễn phí 8:30 - 21:30)</span>
        </p>
      </div>

      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG <a className='font-bold'>từ 10.000.000Đ</a></li>
        <li>BẢO HÀNH  <a className='font-bold'>1 đổi 1</a> DO LỖI NHÀ SẢN XUẤT</li>
        <li>CAM KẾT  <a className='font-bold'>100% chính hãng</a></li>
      </ul>
 
            <div className='foot pt-[100px] mb-[10px] border-t-2 border-black justify-between flex'>
            
              
            </div>
           
        </div>
        </div>
        <div className='pt-[90px]'>
        <h1 className="text-4xl font-bold mb-[10px]">Other Products</h1>
        <div className='pt-[10px] grid grid-cols-4 gap-4'>
        <div className="pt-[40px]">
        <img className="w-[100%]" src={anh16} alt="" />
        <div className="flex  ">
          <h2 className="text-[18px] font-bold">Round Dining Table</h2>
          <p className="text-[20px] font-bold pl-[110px]">$55</p>
        </div>
        <p>Bed table</p>
        <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
      </div>
      <div className="pt-[40px]">
        <img className="w-[100%]" src={anh15} alt="" />
        <div className="flex  ">
          <h2 className="text-[18px] font-bold">Right Hand Fabric</h2>
          <p className="text-[20px] font-bold pl-[110px]">$55</p>
        </div>
        <p>Desk decor</p>
        <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
      </div>
      <div className="pt-[40px]">
        <img className="w-[100%]" src={anh13} alt="" />
        <div className="flex  ">
          <h2 className="text-[18px] font-bold">Velvet Wingback Chair</h2>
          <p className="text-[20px] font-bold pl-[110px]">$55</p>
        </div>
        <p>Basket</p>
        <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
      </div>
      <div className="pt-[40px]">
        <img className="w-[100%]" src={anh12} alt="" />
        <div className="flex  ">
          <h2 className="text-[18px] font-bold">Velvet Wingback Chair</h2>
          <p className="text-[20px] font-bold pl-[110px]">$55</p>
        </div>
        <p>Chair</p>
        <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
      </div>
        </div>
        </div>
    </div>
        </>
    )
}
