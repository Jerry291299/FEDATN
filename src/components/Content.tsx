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
import noithattinhte from "./img/noithattinhte.jpeg";
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
        <div>
          <div className="box1 relative text-center">
            <img src={Sofa} alt="Sofa" className="object-cover w-full h-[670px]" />
            <div className="w-full absolute top-[210px] left-0 text-center">
              <p className="text-white text-[40px]">Sofa</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="box2 relative text-center flex-1">
              <img src={banan} alt="Bàn ăn" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Bàn ăn</p>
              </div>
            </div>
            <div className="box2 relative text-center flex-1">
              <img src={giuong} alt="Giường" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Giường</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="box3 relative text-center flex-1">
              <img src={armchair} alt="Armchair" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Armchair</p>
              </div>
            </div>
            <div className="box3 relative text-center flex-1">
              <img src={ghean} alt="Ghế ăn" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Ghế ăn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-[40px] bg-gray-200 border border-black rounded-lg shadow-lg">
        <div>
          <div className="box1 relative text-center">
            <img src={phongkhach} alt="Phòng khách" className="w-full object-cover h-[95%]" />
            <div className="pt-0 left-0 text-center mt-[10px]">
              <h2 className="text-3xl font-bold mb-4">Không gian phòng khách</h2>
              <p className="text-gray-600 mb-6">Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình.</p>
              <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold">Mẫu thiết kế &rarr;</a>
            </div>
          </div>
          <div className="p-6">
            <img src={phongngu} alt="Phòng ngủ" className="w-[75%] object-cover" />
            <h2 className="text-[20px] font-bold">Không gian phòng ngủ</h2>
            <p className="text-gray-600 mb-6">Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần gũi và thoải mái</p>
            <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold">Mẫu phòng ngủ &rarr;</a>
          </div>
        </div>

        <div>
          <div className="box1 relative text-center">
            <img src={trangtri} alt="Đồ trang trí" className="h-full object-cover w-[55%] float-right" />
            <div className="pt-0 left-0 text-center mt-[10px]">
              <h2 className="text-[20px] font-bold">Đồ trang trí</h2>
              <p className="text-gray-600 mb-6">Mang lại những nguồn cảm hứng và nét sinh động cho không gian.</p>
              <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold">Khám phá &rarr;</a>
            </div>
          </div>
          <div className="p-6">
            <img src={phongan} alt="Phòng ăn" className="h-full object-cover" />
            <h2 className="text-[20px] font-bold">Không gian phòng ăn</h2>
            <p className="text-gray-600 mb-6">Không gian phòng ăn đóng vai trò quan trọng trong văn hóa Việt.</p>
            <a href="#" className="text-gray-500 hover:text-gray-700 font-semibold">Mẫu phòng ăn &rarr;</a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 pt-[100px]">
  <div className="flex flex-col items-center">
    <h2 className="font-bold text-[35px] text-center pt-[35px]">Nội thất tinh tế</h2>
    <p className="text-center text-[25px] mb-[40px]">
      Với kinh nghiệm hơn 24 năm, Nhà Xinh mang đến giải pháp toàn diện trong nội thất.
    </p>
    <a href="#" className="px-[30px] py-[20px] text-[20px] font-semibold text-blue border-2 border-black hover:bg-blue-700">
      Xem Thêm
    </a>
  </div>
  <div>
    <img src={noithattinhte} alt="Nội thất tinh tế" className="w-full h-auto" />
  </div>
</div>

      <h2 className="font-bold text-[35px] pt-[25px]">Sản phẩm mới</h2>
      <div className="flex gap-2 pt-[45px] border-t-2 border-black">
        {[sofa1, sofa2, sofa3, sofa4].map((img, index) => (
          <div key={index}>
            <img src={img} alt="Sofa" className="w-full" />
            <p className="font-bold">{`Sản phẩm ${index + 1}`}</p>
            <a href="#" className="float-right">{`${(index + 1) * 10},000,000₫`}</a>
          </div>
        ))}
      </div>

      <h3 className="text-[35px] pt-[25px]">Sản phẩm vừa xem</h3>
      <div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-[15px]">
        {[sofa5, sofa6].map((img, index) => (
          <div key={index}>
            <img src={img} alt="Sản phẩm" className="w-[90%] h-[85%]" />
            <p className="font-bold text-[15px] text-center">Sản phẩm {index + 1}</p>
            <a href="#" className="text-[17px]">Chi tiết sản phẩm...</a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 bg-gray-200 border-t-2 border-black">
  <div className="pt-[100px] flex flex-col items-center">
    <h2 className="font-bold text-[35px] text-center pt-[35px]">Tổ ấm của người tinh tế</h2>
    <p className="text-center text-[25px] mb-[40px]">
      Hơn 24 năm với tinh thần “Việt”, Nhà Xinh tạo ra những thiết kế độc đáo.
    </p>
    <a href="#" className="px-[30px] py-[20px] text-[20px] font-semibold text-blue border-2 border-black hover:bg-blue-700">
      Xem Thêm
    </a>
  </div>
  <div>
    <img src={toam} alt="Tổ ấm" className="w-full h-auto" />
  </div>
</div>

    </>
  );
};

export default Content;
