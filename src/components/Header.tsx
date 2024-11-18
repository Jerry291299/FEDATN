import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icategory } from "../interface/category";
import { getAllCategories } from "../service/category";
import Facebook from "../anh/Facebook.png";
import nguoi from "../anh/user.png";
import logo from "./img/Black & White Minimalist Aesthetic Initials Font Logo.png";
import iconarrow from "./icons/down-arrow_5082780.png";

const Header = () => {
  const [user, setUser] = useState<{
    info: { role: string; email: string; id: string };
    id: string;
  } | null>(null);
  const [categories, setCategories] = useState<Icategory[]>([]);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    Navigate("/");
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      Navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="container mx-auto w-full">
      <div className="up py-[15px] flex justify-between font-medium pr-[10px]">
        <div className="trái flex">
          <p className="border-r-2 border-black px-[20px]">
            Số điện thoại: 0344357227
          </p>
          <p className="px-[20px]">Email: Beautifullhouse@gmail.com</p>
        </div>
        <div className="phải flex gap-3">
          {user ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer border-2 border-black rounded-xl px-[10px] py-[5px]"
                onClick={toggleSubMenu}
              >
                <img src={nguoi} alt="Hồ sơ" className="w-5 h-5" />
                <p className="ml-2 flex gap-2">
                  {user.info.email}
                  <img className="w-4 h-4 mt-[5px]" src={iconarrow} alt="" />
                </p>
              </div>
              {isSubMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  {user.info.role === "admin" && (
                    <li className="hover:bg-gray-100">
                      <Link
                        to="/admin"
                        className="block px-4 py-2"
                        onClick={() => setIsSubMenuOpen(false)}
                      >
                        Quản trị
                      </Link>
                    </li>
                  )}
                  {(user.info.role === "user" ||
                    user.info.role === "admin") && (
                    <>
                      <li className="hover:bg-gray-100">
                        <Link
                          to={`/Cart/${user.id}`}
                          className="block px-4 py-2"
                          onClick={() => setIsSubMenuOpen(false)}
                        >
                          Xem Giỏ hàng
                        </Link>
                      </li>
                      <li className="hover:bg-gray-100">
                        <Link
                          to="/listdonhang"
                          className="block px-4 py-2"
                          onClick={() => setIsSubMenuOpen(false)}
                        >
                          Xem Đơn hàng
                        </Link>
                      </li>
                    </>
                  )}
                  <li className="hover:bg-gray-100">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsSubMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to={"/login"}>
                <div className="flex">
                  <img
                    className="scale-[0.9] pl-[30px] pr-[10px]"
                    src={nguoi}
                    alt=""
                  />
                  Đăng nhập
                </div>
              </Link>
              <Link to={"/register"}>
                <div className="flex">
                  <img
                    className="scale-[0.9] pl-[30px] pr-[10px]"
                    src={nguoi}
                    alt=""
                  />
                  Đăng ký
                </div>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="down flex justify-between border-y-2 py-[12px] border-black pr-[10px]">
        <img className="h-24 pl-[40px]" src={logo} alt="" />
        <div className="right flex pl-[30px]">
          <div className="text flex gap-14 pt-[25px] pr-[100px] text-lg">
            <Link to="/" className="hover:border-b-2 border-black">
              Trang chủ
            </Link>
            <div className="relative">
              <button
                onClick={toggleCategories}
                className="hover:border-b-2 border-black"
              >
                Danh Mục
              </button>
              {isCategoriesOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  {categories
                    .filter((category) => category.status === "active")
                    .map((category) => (
                      <li key={category._id} className="hover:bg-gray-100">
                        <Link
                          to={`/category/${category._id}`}
                          className="block px-4 py-2"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <NavLink to={"/products"} className="hover:border-b-2 border-black">
              Sản phẩm
            </NavLink>
            <NavLink to={"/tintuc"} className="hover:border-b-2 border-black">
              Tin tức
            </NavLink>
            <NavLink
              to={"/gioithieu"}
              className="hover:border-b-2 border-black"
            >
              Giới thiệu
            </NavLink>
          </div>

          <div className="search px-[30px] pt-[23px]">
            <div className="relative">
              <input
                type="text"
                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
              />
              <svg
                className="w-4 h-4 absolute right-[10px] top-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
