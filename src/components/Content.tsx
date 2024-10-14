import React from "react";
import Sofa from "./img/BST-COASTAL-SOFA-VANG-2.jpg";
import banan from "./img/nha-xinh-banner-ban-an-vuong-24423.jpg";
import giuong from "./img/giuong-ngu-pio-1.jpg";
import armchair from "./img/banner-armchair-nhaxinh-31-1-24.jpg";
import ghean from "./img/nha-xinh-ghe-an-phong-an-749x800.jpg";
import phongkhach from "./img/phongkhach.jpeg";
import trangtri from "./img/trangtri.jpeg";
import phongngu from "./img/phongngu.jpeg";
import phongan from "./img/phongan.jpeg";
import noithattinhte from "./img/noithattinhte.jpeg"
import sofa1 from "./img/sofa1.jpeg";
import sofa2 from "./img/sofa2.jpeg";
import sofa3 from "./img/sofa3.jpeg";
import sofa4 from "./img/sofa4.jpeg";
import sofa5 from "./img/sofa5.jpeg";
import sofa6 from "./img/sofa6.jpeg";
import battay1 from "./img/battay1.jpeg";
import battay2 from "./img/battay2.jpeg";
import toam from "./img/toamnguoitinhte.jpeg";
type Props = {};

const Content = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
  <div className="">
    <div className="box1 relative text-center">
      <img src={Sofa} alt="" className=" object-cover" />
      <div className="w-full absolute pt-0 left-0 text-center mt-[210px]">
        <p className="text-white text-[40px]">Sofa</p>
      </div>
    </div>
  </div>

  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <div className="box2 relative text-center flex-1">
        <img src={banan} alt="" className="h-full object-cover" />
        <div className="w-full absolute pt-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Bàn ăn</p>
        </div>
      </div>
      <div className="box2 relative text-center flex-1">
        <img src={giuong} alt="" className="h-full object-cover" />
        <div className="w-full absolute pt-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Giường</p>
        </div>
      </div>
    </div>

    <div className="flex gap-2">
      <div className="box3 relative text-center flex-1">
        <img src={armchair} alt="" className="h-full object-cover" />
        <div className="w-full absolute pt-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Armchair</p>
        </div>
      </div>
      <div className="box3 relative text-center flex-1">
        <img src={ghean} alt="" className="h-full object-cover" />
        <div className="w-full absolute pt-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Ghế ăn</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="grid grid-cols-2 gap-4 pt-[40px] max-sm mx-auto bg-gray border border-black rounded-lg shadow-lg bg-gray-200">
  <div className="">
    <div className="box1 relative text-center">
      <img src={phongkhach} alt="" className="w-full object-cover h-[95%] " />
      <div className="w-full pt-0 left-0 text-center mt-[10px]">
      <h2 className="text-3xl font-bold mb-4">Không gian phòng khách</h2>
      <p className="text-gray-600 mb-6">Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình.</p>
      <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold pt-[10px]">Mẫu thiết kế &rarr;</a>
      </div>
    </div>
    <div className="">
    <div className="">
      <img src={phongngu} alt="" className="w-[75%] object-cover p-[45px]" />
      <div className="">
      <h2 className="text-[20px] font-bold">Không gian phòng ngủ</h2>
            <p className="text-gray-600 mb-6">Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần gũi và thoải mái</p>
            <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold pt-[10px]">Mẫu phòng ngủ &rarr;</a>
      </div>
    </div>
  </div>
  </div>
  <div className="">
    <div className="box1 relative text-center">
      <img src={trangtri} alt="" className="h-full object-cover w-[55%] float-right" />
      <div className="w-full pt-0 left-0 text-center mt-[10px] ">
            <h2 className="text-[20px] font-bold">Đồ trang trí</h2>
            <p className="text-gray-600 mb-6">Mang lại những nguồn cảm hứng và nét sinh động cho không gian.</p>
            <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold pt-[10px]">Khám phá &rarr;</a>
        </div>
    </div>
    <div className="">
    <div className="">
      <img src={phongan} alt="" className="h-full object-cover pt-[40px]" />
      <div className="">
      <h2 className="text-[20px] font-bold">Không gian phòng ăn</h2>
            <p className="text-gray-600 mb-6">Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt</p>
            <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold ">Mẫu phòng ăn &rarr;</a>
      </div>
    </div>
  </div>
</div>
  </div>
  <div className="grid grid-cols-2  ">
  
  <div className="pt-[100px]">
      <h2 className="font-bold text-[35px] text-center pt-[35px]">Nội thất tinh tế</h2>
      <p className="text-center text-[25px] mb-[40px]">
      Với kinh nghiệm hơn 24 năm trong hoàn thiện nội thất, Nhà Xinh mang đến giải pháp toàn diện trong bao gồm thiết kế, trang trí và cung cấp nội thất trọn gói. Sở hữu đội ngũ chuyên nghiệp và hệ thống 10 cửa hàng, Nhà Xinh là lựa chọn cho không gian tinh tế và hiện đại.
      </p>
      <a href="#" className="px-[30px] py-[20px] text-[20px] my-[20px] ml-[380px] font-semibold text-blue border-2 border-black hover:bg-blue-700 ">Xem Thêm</a>
    </div>
    <div className="">
      <div className="">
        <img src={noithattinhte} alt="" className="" /> 
        
      </div>

    </div>

  </div>
  <h2 className="font-bold text-[35px]">Sản phẩm mới </h2>
  <div className="flex gap-2 pt-[45px] border-t-2 border-black"> 
    <div className="">
      <div className="">
      <img src={sofa1} alt="" className="w-full" />
      </div>
      <p className="font-bold">
      Bàn nước Orientale walnut
      </p>
      <a href="#" className="float-right">49,900,000₫</a>
      </div>
      <div className="">
      <div className="">
      <img src={sofa2} alt="" className="w-full" />
      </div>
      <p className="font-bold">
      Sofa 3 chỗ Orientale da beige R5
      </p>
      <a href="#" className="float-right">135,750,000₫</a>
      </div>
      <div className="">
      <div className="">
      <img src={sofa3} alt="" className="w-full" />
      </div>
      <p className="font-bold">
      Sofa 2 chỗ Mây mới
      </p>
      <a href="#" className="float-right ">19,900,000₫</a>
      </div>
      <div className="">
      <div className="">
      <img src={sofa4} alt="" className="w-full" />
      </div>
      <p className="font-bold">
      Armchair Mây mới
      </p>
      <a href="#" className="float-right">13,900,000₫</a>
      </div>
  </div>
  <h3 className="text-[35px] pt-[25px]">Sản phẩm vừa xem</h3>
<div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-[15px] ">
  <div className="">
      <div className="">
        <img src={sofa5} alt="" className="w-[90%] h-[85%]" />
      </div>
      <p className="font-bold text-[15px] text-center">
        Gợi ý nội thất cho không gian thư giãn mùa thu
      </p>
      <a href="#" className="text-[17px]">Khi mùa thu về,không gian sống của bạn cần một làn gió để hoà mình vào vẻ đẹp[...]</a>
  </div>
  <div className="">
      <div className="">
        <img src={sofa6} alt="" className="w-full" />
      </div>
      <p className="font-bold text-[15px] text-center">
        Phòng khách tối giản ,hiện đại cho giới trẻ
      </p>
      <a href="#" className="text-[17px]">Phòng khách tối giản mang đến một không gian thanh lịch và gọn gàng.Nội thất đa năng,với thiết[...]</a>
  </div>
</div>
<div className="grid grid-cols-2 border-t-2 border-black bg-gray ">
  
  <div className="bg-gray-200 pt-[100px]">
      <h2 className="font-bold text-[35px] text-center pt-[35px] ">Tổ ấm của người tinh tế</h2>
      <p className="text-center text-[25px] mb-[40px]">
      Trong suốt hơn 24 năm qua, cảm hứng từ gu thẩm mỹ tinh tế và tinh thần “Việt” đã giúp Nhà Xinh tạo ra những thiết kế độc đáo, hợp thời và chất lượng. Nhà Xinh hiện đã mở 10 cửa hàng tại Việt Nam.
      </p>
      <a href="#" className="px-[30px] py-[20px] text-[20px] my-[20px] ml-[380px] font-semibold text-blue border-2 border-black hover:bg-blue-700 ">Xem Thêm</a>
    </div>
    <div className="">
      <div className="">
        <img src={toam} alt="" className="" /> 
        
      </div>

    </div>

  </div>
  <h3 className="text-[45px] pt-[25px] text-center font-bold border-t-2">Chuyện Nhà Xinh</h3>
<div className="grid grid-cols-2 gap-4  pt-[15px] ">
  <div className="">
      <div className="">
        <img src={battay1} alt="" className="w-[90%] h-[85%]" />
      </div>
      <p className="font-bold text-[15px] text-center">
  Nhà Xinh tại Triển lãm VIBE 2024
      </p>
      <a href="#" className="text-[17px]">Nhà xinh vinh dự góp mặt tại triển lãm VIBE 2024,giới thiệu loạt sản phẩm và bộ sưu tập[..]</a>
  </div>
  <div className="">
      <div className="">
        <img src={battay2} alt="" className="w-full" />
      </div>
      <p className="font-bold text-[15px] text-center">
       LG Object Collection
      </p>
      <a href="#" className="text-[17px]">Giá trị của sự hài hoà trong thiết kế được thể hiện rõ nét ở bộ siêu tập Object[..]</a>
  </div>
</div>
    </>
  );
};

export default Content;
