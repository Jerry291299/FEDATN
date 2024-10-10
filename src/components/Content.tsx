import React from "react";
import Sofa from "./img/BST-COASTAL-SOFA-VANG-2.jpg";
import banan from "./img/nha-xinh-banner-ban-an-vuong-24423.jpg";
import giuong from "./img/giuong-ngu-pio-1.jpg";
import armchair from "./img/banner-armchair-nhaxinh-31-1-24.jpg";
import ghean from "./img/nha-xinh-ghe-an-phong-an-749x800.jpg";

type Props = {};

const Content = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
  <div className="">
    <div className="box1 relative text-center">
      <img src={Sofa} alt="" className="h-full object-cover" />
      <div className="w-full absolute top-0 left-0 text-center mt-[210px]">
        <p className="text-white text-[40px]">Sofa</p>
      </div>
    </div>
  </div>

  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <div className="box2 relative text-center flex-1">
        <img src={banan} alt="" className="h-full object-cover" />
        <div className="w-full absolute top-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Bàn ăn</p>
        </div>
      </div>
      <div className="box2 relative text-center flex-1">
        <img src={giuong} alt="" className="h-full object-cover" />
        <div className="w-full absolute top-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Giường</p>
        </div>
      </div>
    </div>

    <div className="flex gap-2">
      <div className="box3 relative text-center flex-1">
        <img src={armchair} alt="" className="h-full object-cover" />
        <div className="w-full absolute top-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Armchair</p>
        </div>
      </div>
      <div className="box3 relative text-center flex-1">
        <img src={ghean} alt="" className="h-full object-cover" />
        <div className="w-full absolute top-0 left-0 text-center mt-[110px]">
          <p className="text-white text-[20px]">Ghế ăn</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="khonggian">
  
</div>
    </>
  );
};

export default Content;
