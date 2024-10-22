import { Link, NavLink, useNavigate } from "react-router-dom";
import Facebook from "../anh/Facebook.png";

import heart from "../anh/heart.png";

import noti from "../anh/notification.png";
import shoppingcard from "../anh/shopping-cart.png";
import insta from "../anh/Instagram.png";
import link from "../anh/LinkedIn.png";
import twitter from "../anh/Twitter.png";
import nguoi from "../anh/user.png";
import logo from "./img/Black & White Minimalist Aesthetic Initials Font Logo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<{
    info: { role: string };
    id: string;
  } | null>(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(user?.info?.role, "roleodayyy");
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    Navigate("/");
  };

  return (
    <>
      <div className="container mx-auto w-full">
        <div className="up py-[15px] flex justify-between font-medium pr-[10px]">
          <div className="trái flex">
            <p className="border-r-2 border-black px-[20px]">
              Phone Number: 0344357227
            </p>
            <p className="px-[20px]">Email:Beautifullhouse@gmail.com</p>
          </div>
          <div className="icon flex pr-[500px] gap-4 ">
            <img className="w-[40px] h-[40px]" src={Facebook} alt="" />
            <img className="w-[40px] h-[40px]" src={insta} alt="" />
            <img className="w-[40px] h-[40px]" src={twitter} alt="" />
            <img className="w-[40px] h-[40px]" src={link} alt="" />
          </div>

          <div className="phải flex gap-3">
            {user ? (
              <>
                {/* Show Admin link only if user role is "admin" */}
                {user?.info?.role === "admin" && (
                  <Link to="/admin" className="hover:border-b-2 border-black">
                    <li>Admin</li>
                  </Link>
                )}

                {/* Show "Xem Gio Hang" and "Xem Don Hang" buttons for both "user" and "admin" */}
                {(user?.info?.role === "user" ||
                  user?.info?.role === "admin") && (
                  <>
                    <Link to="/cart" className="btn btn-warning">
                      <li>Xem Gio hang</li>
                    </Link>

                    <Link to="/order" className="btn btn-warning">
                      <li>Xem Don hang</li>
                    </Link>
                  </>
                )}

                <li>
                  <button onClick={handleLogout} className="btn btn-warning">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <div></div>
                <Link to={"/login"}>
                  <div className="flex">
                    <img
                      className="scale-[0.9] pl-[30px] pr-[10px]"
                      src={nguoi}
                      alt=""
                    />
                    Login
                  </div>
                </Link>
                <Link to={"/register"}>
                  <div className="flex">
                    <img
                      className="scale-[0.9] pl-[30px] pr-[10px]"
                      src={nguoi}
                      alt=""
                    />
                    Register
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="down flex justify-between  border-y-2 py-[12px] border-black  pr-[10px]">
          <img className="h-24 pl-[40px]" src={logo} alt="" />
          <div className="right flex pl-[30px]">
            <div className="text flex gap-14 pt-[25px] pr-[100px] text-lg">
              <Link to="/" className="hover:border-b-2 border-black">
                Home
              </Link>

              <NavLink to={"/products"}>
                <button className="hover:border-b-2 border-black">
                  Sảm phẩm
                </button>
              </NavLink>

              <p className="hover:border-b-2 border-black">Tin tức</p>
              <p className="hover:border-b-2 border-black">Giới thiệu</p>
            </div>

            <div className="search px-[30px] pt-[23px]">
              <div className="relative">
                <input
                  type="text"
                  className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="search..."
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

            <div className="icon2 flex gap-10 pt-[25px]">
              <div className="">
                <img className="pl-[15px]" src={heart} alt="" />
                <p>Wishlist</p>
              </div>
              <div className="">
                <img className="pl-[3px]" src={shoppingcard} alt="" />
                <Link to={"/cart"}>Cart</Link>
              </div>
              <div className="">
                <img className="pl-[25px]" src={noti} alt="" />
                <p>Notification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
