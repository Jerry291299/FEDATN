
import React, { useState, useEffect } from "react";
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
import { NavLink } from "react-router-dom";
import sofa1 from "./img/sofa1.jpeg";
import sofa2 from "./img/sofa2.jpeg";
import sofa3 from "./img/sofa3.jpeg";
import sofa4 from "./img/sofa4.jpeg";
import sofa5 from "./img/sofa5.jpeg";
import sofa6 from "./img/sofa6.jpeg";
import battay1 from "./img/battay1.jpeg";
import battay2 from "./img/battay2.jpeg";
import toam from "./img/toamnguoitinhte.jpeg";
import { Iproduct } from "../interface/products"; // Giả sử bạn đã định nghĩa interface Iproduct
import { getAllproducts } from "../service/products"; // Hàm gọi API để lấy danh sách sản phẩm

type Props = {};

const Content = (props: Props) => {
  const [products, setProducts] = useState<Iproduct[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sanpham = await getAllproducts({ limit: 4, page: 1 });
        setProducts(sanpham.docs || []);
        console.log(sanpham.docs, "day");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className="font-bold text-[35px] text-center pt-[25px]">
        Sản phẩm mới
      </h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 mt-[30px] mb-[50px] px-[20px] md:px-[40px] lg:px-[60px]">
                    {products.slice(0, 8).map((product: Iproduct, index: number) => (
                         <article
                         key={product._id}
                         className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-all"
                       >
                         <NavLink to={`/product/${product._id}`}>
                           <img
                             src={product.img[0]}
                             alt={product.name}
                             className="h-56 w-full object-cover rounded-t-lg"
                           />
                           <div className="p-4">
                             <h2 className="text-lg font-serif mb-2">{product.name}</h2>
                             <p className="text-sm text-gray-500">{product.moTa}</p>
                             <p className="text-xl font-bold text-red-600">
                               ${product.price}
                             </p>
                           </div>
                           <div className="p-4">
                             <button className="w-full py-2 text-center bg-gray-100 rounded-lg hover:bg-gray-200">
                               View Details
                           </button>
                           </div>
                         </NavLink>
                       </article>
                    ))}
                </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <div className="box1 relative text-center">
            <img src={Sofa} alt="" className="object-cover w-full h-[670px]" />
            <div className="w-full absolute top-[210px] left-0 text-center">
              <p className="text-white text-[40px]">Sofa</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="box2 relative text-center flex-1">
              <img src={banan} alt="" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Bàn ăn</p>
              </div>
            </div>
            <div className="box2 relative text-center flex-1">
              <img src={giuong} alt="" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Giường</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="box3 relative text-center flex-1">
              <img src={armchair} alt="" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Armchair</p>
              </div>
            </div>
            <div className="box3 relative text-center flex-1">
              <img src={ghean} alt="" className="h-full object-cover" />
              <div className="w-full absolute top-[110px] left-0 text-center">
                <p className="text-white text-[20px]">Ghế ăn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-[40px] max-sm mx-auto bg-gray border border-black rounded-lg shadow-lg bg-gray-200">
        <div className="">
          <div className="box1 relative text-center">
            <img
              src={phongkhach}
              alt=""
              className="w-full object-cover h-[95%]"
            />
            <div className="w-full pt-0 left-0 text-center mt-[10px]">
              <h2 className="text-3xl font-bold mb-4">
                Không gian phòng khách
              </h2>
              <p className="text-gray-600 mb-6">
                Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia
                đình.
              </p>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 font-semibold pt-[10px]"
              >
                Mẫu thiết kế &rarr;
              </a>
            </div>
          </div>
          <div className="">
            <img
              src={phongngu}
              alt=""
              className="w-[75%] object-cover p-[45px]"
            />
            <div className="">
              <h2 className="text-[20px] font-bold">Không gian phòng ngủ</h2>
              <p className="text-gray-600 mb-6">
                Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần
                gũi và thoải mái
              </p>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 font-semibold pt-[10px]"
              >
                Mẫu phòng ngủ &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="">
          <div className="box1 relative text-center">
            <img
              src={trangtri}
              alt=""
              className="h-full object-cover w-[55%] float-right"
            />
            <div className="w-full pt-0 left-0 text-center mt-[10px] ">
              <h2 className="text-[20px] font-bold">Đồ trang trí</h2>
              <p className="text-gray-600 mb-6">
                Mang lại những nguồn cảm hứng và nét sinh động cho không gian.
              </p>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 font-semibold pt-[10px]"
              >
                Khám phá &rarr;
              </a>
            </div>
          </div>
          <div className="">
            <img
              src={phongan}
              alt=""
              className="h-full object-cover pt-[40px]"
            />
            <div className="">
              <h2 className="text-[20px] font-bold">Không gian phòng ăn</h2>
              <p className="text-gray-600 mb-6">
                Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian
                phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt
              </p>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 font-semibold"
              >
                Mẫu phòng ăn &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 pt-[100px]">
        <div className="">
          <h2 className="font-bold text-[35px] text-center pt-[35px]">
            Nội thất tinh tế
          </h2>
          <p className="text-center text-[25px] mb-[40px]">
            Với kinh nghiệm hơn 24 năm trong hoàn thiện nội thất, Nhà Xinh mang
            đến giải pháp toàn diện trong bao gồm thiết kế, trang trí và cung
            cấp nội thất trọn gói.
          </p>
          <a
            href="#"
            className="px-[30px] py-[20px] text-[20px] my-[20px] ml-[380px] font-semibold text-blue border-2 border-black hover:bg-blue-700"
          >
            Xem Thêm
          </a>
        </div>
        <div className="">
          <img src={noithattinhte} alt="" className="w-full h-auto" />
        </div>
      </div>
    </>
  );
};

export default Content;
