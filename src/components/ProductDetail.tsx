import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Iproduct } from "../interface/products";
import { Icategory } from "../interface/category";
import { getProductByID } from "../service/products";
import { getCategoryByID } from "../service/category";
import Header from "./Header";
import LoadingComponent from "./Loading";
import Footer from "./Footer";
import anh12 from "./img/sofa6.jpeg";
import anh13 from "./img/sofa5.jpeg";
import anh15 from "./img/sofa3.jpeg";
import anh16 from "./img/sofa4.jpeg";
import { actions, Cartcontext } from "./contexts/cartcontext";
import { addtoCart } from "../service/cart";
import { Icart } from "../interface/cart";

type Props = {};

const ProductDetail = (props: Props) => {
  const { id } = useParams();
  const [products, setProduct] = useState<Iproduct>();
  const Globalstate = useContext(Cartcontext);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("user");
    console.log("Retrieved userId:", storedUserId); // Debug log
    if (storedUserId) {
      setUser(storedUserId);
    } else {
      console.error("User ID not found in sessionStorage.");
    }
  }, []);
  // const cartItemCount = cartItems ? cartItems[Number(id)] : 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductByID(id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const dispatch = Globalstate.dispatch;

  // if (loading) return <LoadingComponent />;

  return (
    <>
      <Header />
      <div className="container mx-auto w-[1400px] pt-[100px]">
        {products && (
          <div className="container mx-auto w-[1300px] flex">
            <div className="">
              <img
                className="mb-[20px] w-[150px]"
                src={products.img}
                alt={products.name}
              />
              <img
                className="mb-[20px] w-[150px]"
                src={products.img}
                alt={products.name}
              />
              <img
                className="mt-[10px] w-[150px]"
                src={products.img}
                alt={products.name}
              />
              <img
                className="mt-[10px] w-[150px]"
                src={products.img}
                alt={products.name}
              />
            </div>
            <div className="ml-[40px]">
              <img
                className="w-[650px] object-cover"
                src={products.img}
                alt={products.name}
              />
            </div>
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-xl font-bold text-black-800">
                {products.name}
              </h1>
              {/* <p className="font-bold text-gray-500">Danh mục: {products?.category}</p> */}
              <div className="my-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold text-black-600">
                    {products.price}₫
                  </span>
                </div>
                <p className="font-bold text-gray-600">
                  Tiết kiệm:
                  <span className="text-red-600">50.000 ₫</span>
                </p>
                <p className="font-bold text-gray-500 mt-2">
                  Tình trạng:
                  <span className="font-semibold text-green-600">Còn hàng</span>
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-orange-400"
                onClick={async () => {
                  // Retrieve user from sessionStorage
                  const userString = sessionStorage.getItem("user");

                  // Parse user string into an object
                  const user = userString ? JSON.parse(userString) : null;

                  if (!products || !products._id) {
                    alert("products ID is invalid.");
                    return;
                  }

                  if (!user || !user.info.id) {
                    alert("User ID is invalid or missing.");
                    return;
                  }

                  const cartItem: Icart = {
                    userId: user.info.id, // assuming `user.info.id` is correct
                    items: [
                      {
                        productId: String(products._id), // change from `productsId` to `productId`
                        name: products.name,
                        price: products.price,
                        img: products.img,
                        quantity: 1,
                      },
                    ],
                  };

                  try {
                    console.log("Adding to cart:", cartItem);

                    // Call the add to cart API
                    const response = await addtoCart(cartItem);

                    // Dispatch the response to your context
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
                    {" "}
                    0829721097
                  </a>
                  <span className="text-gray-600">(miễn phí 8:30 - 21:30)</span>
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG{" "}
                  <a className="font-bold">từ 10.000.000Đ</a>
                </li>
                <li>
                  BẢO HÀNH <a className="font-bold">1 đổi 1</a> DO LỖI NHÀ SẢN
                  XUẤT
                </li>
                <li>
                  CAM KẾT <a className="font-bold">100% chính hãng</a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="pt-[90px]">
          <h1 className="text-4xl font-bold mb-[10px]">Other product</h1>
          <div className="pt-[10px] grid grid-cols-4 gap-4">
            <div className="pt-[40px]">
              <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
              <div className="flex">
                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                <p className="text-[20px] font-bold pl-[110px]">$55</p>
              </div>
              <p>Bed table</p>
              <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">
                Add to cart
              </button>
            </div>
            <div className="pt-[40px]">
              <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
              <div className="flex">
                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                <p className="text-[20px] font-bold pl-[110px]">$55</p>
              </div>
              <p>Bed table</p>
              <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">
                Add to cart
              </button>
            </div>
            <div className="pt-[40px]">
              <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
              <div className="flex">
                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                <p className="text-[20px] font-bold pl-[110px]">$55</p>
              </div>
              <p>Bed table</p>
              <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">
                Add to cart
              </button>
            </div>
            <div className="pt-[40px]">
              <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
              <div className="flex">
                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                <p className="text-[20px] font-bold pl-[110px]">$55</p>
              </div>
              <p>Bed table</p>
              <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">
                Add to cart
              </button>
            </div>

            {/* Các sản phẩm khác */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
