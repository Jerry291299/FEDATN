import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Facebook from "../anh/Facebook.png";
import heart from "../anh/heart.png";
import noti from "../anh/notification.png";
import shoppingcard from "../anh/shopping-cart.png";
import insta from "../anh/Instagram.png";
import link from "../anh/LinkedIn.png";
import twitter from "../anh/Twitter.png";
import nguoi from "../anh/user.png";
import logo from "./img/Black & White Minimalist Aesthetic Initials Font Logo.png";
import iconarrow from "./icons/down-arrow_5082780.png";
import canho from "../anh/noi-that-can-ho-cao-cap.jpg";
import canho1 from "../anh/nt.jpg";
import canho2 from "../anh/ntnt.jpg";
const TintucDetail = () => {
    const { id } = useParams<{ id: string }>();
    
    const articles = [
        { id: "1", title: "Nội thất của căn hộ mang nét đẹp nghệ thuật", content: "Khi bước chân vào có thể cảm nhận sự thông thoáng...", image: canho },
        { id: "2", title: "Phòng ăn với nội thất chất liệu gỗ và da", content: "Góc thư giãn nhất trong không gian là nơi tọa lạc", image: canho1 },
        { id: "3", title: "Không gian phòng ngủ kết hợp nội thất từ vật liệu da và gỗ", content: "Góc vườn yên tĩnh xanh mát trên tầng thượng ngôi nhà", image: canho2 },
    ];
    const article = articles.find(article => article.id === id);

    const [user, setUser] = useState<{
        info: { role: string; email: string; id: string };
        id: string;
    } | null>(null);

    useEffect(() => {
        const userData = sessionStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <>
            <header className="up py-3 flex justify-between font-medium pr-2 bg-white shadow-md">
                <div className="trái flex">
                    <p className="border-r-2 border-black px-5">Phone: 0344357227</p>
                    <p className="px-5">Email: Beautifullhouse@gmail.com</p>
                </div>
                <div className="icon flex pr-20 gap-4">
                    <img className="w-6 h-6 cursor-pointer" src={Facebook} alt="Facebook" />
                    <img className="w-6 h-6 cursor-pointer" src={insta} alt="Instagram" />
                    <img className="w-6 h-6 cursor-pointer" src={twitter} alt="Twitter" />
                    <img className="w-6 h-6 cursor-pointer" src={link} alt="LinkedIn" />
                </div>
                <div className="phải flex gap-3">
                    {user ? (
                        <div className="relative">
                            <div className="flex items-center cursor-pointer border-2 border-black rounded-xl px-3 py-1">
                                <img src={nguoi} alt="Profile" className="w-5 h-5" />
                                <p className="ml-2 flex gap-2">
                                    {user.info.email}
                                    <img className="w-4 h-4 mt-1" src={iconarrow} alt="Arrow Icon" />
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Link to={"/login"} className="flex gap-2 items-center">
                                <img className="w-5" src={nguoi} alt="Login" />
                                <span>Login</span>
                            </Link>
                            <Link to={"/register"} className="flex gap-2 items-center">
                                <img className="w-5" src={nguoi} alt="Register" />
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <div className="down flex justify-between border-y-2 py-3 border-black pr-2">
                <img className="h-24 pl-10" src={logo} alt="Logo" />
                <nav className="right flex pl-10">
                    <div className="text flex gap-14 pt-6 pr-20 text-lg">
                        <Link to="/" className="hover:border-b-2 border-black">Home</Link>
                        <Link to="/products" className="hover:border-b-2 border-black">Sản phẩm</Link>
                        <p className="hover:border-b-2 border-black">Tin tức</p>
                        <p className="hover:border-b-2 border-black">Giới thiệu</p>
                    </div>
                    <div className="search px-10 pt-5">
                        <div className="relative">
                            <input
                                type="text"
                                className="p-2 pl-8 rounded border bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                                placeholder="search..."
                            />
                            <svg className="w-4 h-4 absolute right-2 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="container mx-auto my-5">
                <h2 className="text-3xl font-bold text-center my-5">Chi tiết tin tức</h2>
                <div className="container mx-auto">
                    {article ? (
                        <>
                            <img src={article.image} alt={article.title} className="w-full h-auto mb-3" />
                            <h1 className="text-3xl font-bold">{article.title}</h1>
                            <p className="mt-4">{article.content}</p>
                        </>
                    ) : (
                        <p>Không tìm thấy bài viết.</p>
                    )}
                    <Link to="/tintuc" className="text-blue-500 underline mt-4">Quay lại trang tin tức</Link>
                </div>
            </div>
            

            <footer className="py-3 bg-gray-100 text-center">
                <p className="text-sm text-gray-600">© 2024 Beautifull House. All rights reserved.</p>
            </footer>
        </>
    );
};

export default TintucDetail;
