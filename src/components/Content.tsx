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

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <h2 className="font-bold text-[35px] text-center pt-[25px]">
        Sản phẩm mới
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 px-4 md:px-8 lg:px-16">
        {products
          .filter((product: Iproduct) => product.status) // Lọc sản phẩm active
          .slice(0, 8) // Hiển thị tối đa 8 sản phẩm
          .map((product: Iproduct) => (
            <article
              key={product._id}
              className="relative flex flex-col overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl bg-white border border-gray-200"
            >
              {/* Hình ảnh sản phẩm */}
              <NavLink to={`/product/${product._id}`} className="block">
                <img
                  src={product.img[0]}
                  alt={product.name}
                  className="h-60 w-full object-cover transition-opacity duration-300 hover:opacity-90 border border-gray-300 rounded-lg"
                />
              </NavLink>

              {/* Thông tin sản phẩm */}
              <div className="flex flex-col p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {truncateText(product.moTa, 40)}
                </p>

                <p className="text-xl font-bold text-red-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    product.variants && product.variants.length > 0
                      ? product.variants[0].price
                      : 0
                  )}
                </p>

                {/* Nút chi tiết */}
                <NavLink
                  to={`/product/${product._id}`}
                  className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Xem chi tiết
                </NavLink>
              </div>
            </article>
          ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-[50px]">
  <div>
    <div className="relative text-center">
      <img
        src={Sofa}
        alt="Sofa"
        className="w-full h-[350px] object-cover border border-gray-300 rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-[40px]">Sofa</p>
      </div>
    </div>
  </div>

  <div className="flex flex-col gap-4">
    <div className="flex gap-4">
      <div className="relative text-center flex-1">
        <img
          src={banan}
          alt="Bàn ăn"
          className="w-full h-[170px] object-cover border border-gray-300 rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-[20px]">Bàn ăn</p>
        </div>
      </div>
      <div className="relative text-center flex-1">
        <img
          src={giuong}
          alt="Giường"
          className="w-full h-[170px] object-cover border border-gray-300 rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-[20px]">Giường</p>
        </div>
      </div>
    </div>

    <div className="flex gap-4">
      <div className="relative text-center flex-1">
        <img
          src={armchair}
          alt="Armchair"
          className="w-full h-[170px] object-cover border border-gray-300 rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-[20px]">Armchair</p>
        </div>
      </div>
      <div className="relative text-center flex-1">
        <img
          src={ghean}
          alt="Ghế ăn"
          className="w-full h-[170px] object-cover border border-gray-300 rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-[20px]">Ghế ăn</p>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="grid grid-cols-2 gap-8 p-8 mx-auto rounded-lg shadow-lg">
  <div className="flex flex-col items-center gap-6">
    {/* Phòng khách */}
    <div className="text-center">
      <img
        src={phongkhach}
        alt="Phòng khách"
        className="w-full h-[300px] object-cover border border-gray-300 rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-3xl font-bold mb-2">Không gian phòng khách</h2>
        <p className="text-gray-600 mb-4">
          Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình.
        </p>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-700 font-semibold"
        >
          Mẫu thiết kế &rarr;
        </a>
      </div>
    </div>

    {/* Phòng ngủ */}
    <div className="text-center">
      <img
        src={phongngu}
        alt="Phòng ngủ"
        className="w-full h-[300px] object-cover border border-gray-300 rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold">Không gian phòng ngủ</h2>
        <p className="text-gray-600 mb-4">
          Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần gũi và thoải mái.
        </p>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-700 font-semibold"
        >
          Mẫu phòng ngủ &rarr;
        </a>
      </div>
    </div>
  </div>

  <div className="flex flex-col items-center gap-6">
    {/* Đồ trang trí */}
    <div className="text-center">
      <img
        src={trangtri}
        alt="Đồ trang trí"
        className="w-full h-[300px] object-cover border border-gray-300 rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold">Đồ trang trí</h2>
        <p className="text-gray-600 mb-4">
          Mang lại những nguồn cảm hứng và nét sinh động cho không gian.
        </p>
        <a
          href="#"
          className="text-gray-500 hover:text-gray-700 font-semibold"
        >
          Khám phá &rarr;
        </a>
      </div>
    </div>

    {/* Phòng ăn */}
    <div className="text-center">
      <img
        src={phongan}
        alt="Phòng ăn"
        className="w-full h-[300px] object-cover border border-gray-300 rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-xl font-bold">Không gian phòng ăn</h2>
        <p className="text-gray-600 mb-4">
          Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt.
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
            Với kinh nghiệm hơn 24 năm trong hoàn thiện nội thất, Nhà Xinh mang đến giải pháp toàn diện trong bao gồm thiết kế, trang trí và cung cấp nội thất trọn gói.
          </p>
          <a
            href="#"
            className="px-[30px] py-[20px] text-[20px] my-[20px] ml-[380px] font-semibold text-blue border-2 border-black hover:bg-blue-700"
          >
            Xem Thêm
          </a>
        </div>
        <div className="">
          <img src={noithattinhte} alt="" className="w-full h-auto border border-gray-300 rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default Content;