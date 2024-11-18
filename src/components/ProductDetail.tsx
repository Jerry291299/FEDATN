import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Iproduct } from "../interface/products";
import { IUser } from "../interface/user";
import { addtoCart } from "../service/cart";
import { getAllproducts, getProductByID } from "../service/products";
import Header from "./Header";
import Footer from "./Footer";
import { actions, Cartcontext } from "./contexts/cartcontext";
import { Icart } from "../interface/cart";
import CommentSection from "../interface/comment";

const ProductDetail = () => {
  const [products, setProducts] = useState<Iproduct[]>([]); // Dữ liệu sản phẩm khác
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const { id } = useParams<{ id: string }>(); // Lấy id sản phẩm từ URL
  const [product, setProduct] = useState<Iproduct | undefined>(undefined);
  const Globalstate = useContext(Cartcontext);
  const [user, setUser] = useState<IUser | null>(null);

  const dispatch = Globalstate.dispatch;

  // Lấy thông tin người dùng từ sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser: IUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      console.error("User not found in sessionStorage.");
    }
  }, []);

  // Lấy dữ liệu sản phẩm chi tiết
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getProductByID(id);
        setProduct(data);
      } catch (error) {
        console.log("Failed to fetch product by ID", error);
      }
    };
    fetchProductData();
  }, [id]);

  // Lấy danh sách các sản phẩm khác
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const sanpham = await getAllproducts({ limit: 4, page: 1 });
        setProducts(sanpham.docs || []);
      } catch (error) {
        console.log("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      
        
       <div className="container mx-auto w-[1400px] pt-[100px]">
        {product && (
          <div className="container mx-auto w-[1300px] flex">
            <div>
              <img
                className="mb-[20px] w-[150px]"
                src={product?.img[1]}
                alt={product?.name}
              />
              <img
                className="mb-[20px] w-[150px]"
                src={product?.img[2]}
                alt={product?.name}
              />
              <img
                className="mb-[20px] w-[150px]"
                src={product?.img[3]}
                alt={product?.name}
              />
              <img
                className="mb-[20px] w-[150px]"
                src={product?.img[4]}
                alt={product?.name}
              />
            </div>
            <div className="ml-[40px] mr-[30px]">
              <img
                className="w-[690px] object-cover"
                src={product.img[0]}
                alt={product.name}
              />
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-xl font-bold text-black-800">
                {product.name}
              </h1>
              <div className="my-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold text-black-600">
                    {product.price}₫
                  </span>
                </div>
                <p className="font-bold text-gray-600">
                  Tiết kiệm: <span className="text-red-600">50.000 ₫</span>
                </p>
                <p className="font-bold text-gray-500 mt-2">
                  Tình trạng:{" "}
                  <span className="font-semibold text-green-600">Còn hàng</span>
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-orange-400"
                onClick={async () => {
                  if (!product || !product._id) {
                    alert("Product ID is invalid.");
                    return;
                  }
                  if (!user || !user.id) {
                    alert("Bạn phải đăng nhập thì mới mua được hàng?");
                    return;
                  }

                  const cartItem: Icart = {
                    userId: user.id,
                    items: [
                      {
                        productId: String(product._id),
                        name: product.name,
                        price: product.price,
                        img: product.img,
                        quantity: 1,
                      },
                    ],
                  };
                  try {
                    const response = await addtoCart(cartItem);
                    dispatch({ type: actions.ADD, payload: response });
                    alert("Added to cart successfully");
                  } catch (error) {
                    console.error("Failed to add products to cart", error);
                  }
                }}
              >
                Add to cart
              </button>
              <div className="my-4 font-bold">
                <p className="text-gray-700">
                  Gọi đặt mua:
                  <a href="tel:0829721097" className="text-blue-600">
                    0829721097
                  </a>
                  <span className="text-gray-600">(miễn phí 8:30 - 21:30)</span>
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG{" "}
                  <span className="font-bold">từ 10.000.000Đ</span>
                </li>
                <li>
                  BẢO HÀNH <span className="font-bold">1 đổi 1</span> DO LỖI NHÀ
                  SẢN XUẤT
                </li>
                <li>
                  CAM KẾT <span className="font-bold">100% chính hãng</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="border-t-2 border-black mt-[40px]"></div>
       <section className="py-10">
                <h1 className="mb-12 text-center font-sans text-4xl font-bold">
                    Sản phẩm tương tự 
                </h1>
                <div className="container mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.slice(0, 8).map((product: Iproduct, index: number) => (
                        <article key={index} className="relative flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <NavLink to={`/product/${product._id}`} className="flex-shrink-0">
                                <img
                                    src={product.img[0]}
                                    alt={product.name}
                                    className="h-56 w-full object-cover"
                                />
                            </NavLink>
                            <div className="flex flex-col p-4 bg-white">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {product.name}
                                </h2>
                                {/* <p className="text-sm text-gray-500 mt-1">
                                    Category: {category.find(cat => cat._id === product.category)?.name || 'Unknown'}
                                </p> */}
                                <p className="mt-2 text-lg font-bold text-green-600">
                                    ${product.price}
                                </p>
                                <NavLink
                                    to={`/product/${product._id}`}
                                    className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                                >
                                    View Details
                                </NavLink>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        <div className="pt-[50px]">
          {user ? (
            <CommentSection productId={id || ""} user={user} />
          ) : (
            <p className="text-gray-500">Bạn cần đăng nhập để bình luận.</p>
          )}
        </div>
      </div>
       
      
      <Footer />
    </>
  );
};

export default ProductDetail;
