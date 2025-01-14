import React, { useEffect, useState } from "react";
import logo from "./img/Black & White Minimalist Aesthetic Initials Font Logo.png";
import face from "../anh/Facebook.png";
import insta from "../anh/Instagram.png";
import chim from "../anh/Twitter.png";
import linkk from "../anh/LinkedIn.png";
import { getAllCategories } from "../service/category"; // Điều chỉnh nhập khẩu dựa trên cấu trúc tệp của bạn

type Props = {};

const Footer = (props: Props) => {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      if (fetchedCategories) {
        setCategories(fetchedCategories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full border-t-2 border-black pt-[100px] mt-[50px]">
      <div className="pl-[20px] px-[10px] pb-[70px] pl-[150px] w-full flex text-black">
        <div className="logo w-[100px]">
          <img className="w-full" src={logo} alt="Logo" />
        </div>
        <div className="categories w-[200px] ml-[140px]">
          <p className="pb-[10px] font-bold">Danh mục</p>
          {categories.slice(0, 5).map((category) => ( // Hiển thị chỉ 5 danh mục đầu tiên
            <p key={category._id} className="pb-[10px]">
              {category.name}
            </p>
          ))}
        </div>
        <div className="About w-[100px] ml-[140px]">
          <p className="pb-[10px] font-bold">Giới thiệu</p>
          <p className="pb-[10px]">Liên hệ chúng tôi</p>
          <p className="pb-[10px]">Về chúng tôi</p>
          <p className="pb-[10px]">Giúp đỡ</p>
          <p className="pb-[10px]">Câu hỏi thường gặp</p>
          <p className="pb-[10px]">Điều khoản</p>
        </div>
        <div className="Subscribe w-[500px] ml-[140px]">
          <p className="font-bold pb-[10px]">Đăng ký</p>
          <p className="py-[10px]">
            Tham gia bản tin của chúng tôi để cập nhật về các tính năng và bản phát hành.
          </p>
          
          <p className="pt-[15px]">
            Bằng cách đăng ký, bạn đồng ý với Chính sách quyền riêng tư của chúng tôi và cung cấp sự đồng ý để nhận cập nhật từ công ty của chúng tôi liên hệ tới Email :  Beautifullhouse@gmail.com.
          </p>
        </div>
      </div>

      <div className="foot pt-[100px] pb-[50px] border-t-2 border-black w-full flex justify-between px-[20px]">
        <div className="text flex gap-5">
          <p>2024 Relume. Tất cả quyền được bảo lưu.</p>
          <a href="#">Chính sách quyền riêng tư</a>
          <a href="#">Điều khoản dịch vụ</a>
          <a href="#">Cài đặt cookie</a>
        </div>
        <div className="icon flex gap-3">
          <img src={face} alt="Facebook" />
          <img src={insta} alt="Instagram" />
          <img src={chim} alt="Twitter" />
          <img src={linkk} alt="LinkedIn" />
        </div>
      </div>
    </div>
  );
};

export default Footer;