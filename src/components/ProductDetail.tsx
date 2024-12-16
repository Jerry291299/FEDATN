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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Iproduct | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const Globalstate = useContext(Cartcontext);
  const [user, setUser] = useState<IUser | null>(null);
  const [comments, setComments] = useState<{ stars: number }[]>([]); // To hold comments with star ratings

  const dispatch = Globalstate.dispatch;

  // Fetch user info
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser: IUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // Fetch product details
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getProductByID(id);
        setProduct(data);
        if (Array.isArray(data.img) && data.img.length > 0) {
          setSelectedImage(data.img[0]);
        }
        // Assuming comments are part of the product data
        setComments(data.comments || []); // Adjust based on your data structure
      } catch (error) {
        console.log("Failed to fetch product by ID", error);
      }
    };
    fetchProductData();
  }, [id]);

  // Fetch related products
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
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const calculateAverageRating = (comments: { stars: number }[]) => {
    if (!comments.length) return 0;
    const totalStars = comments.reduce(
      (acc, comment) => acc + comment.stars,
      0
    );
    return totalStars / comments.length;
  };

  const averageRating = calculateAverageRating(comments);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container mx-auto w-[1400px] pt-[100px]">
        {product && (
          <div className="container mx-auto w-[1300px] flex">
            {/* Small images */}
            <div className="flex flex-col gap-4">
              {Array.isArray(product.img) &&
                product.img.map((image, index) => (
                  <img
                    key={index}
                    className={`w-[150px] h-[150px] object-cover rounded-lg border ${
                      selectedImage === image
                        ? "border-blue-500"
                        : "border-gray-200"
                    } cursor-pointer`}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
            </div>

            {/* Large image */}
            <div className="ml-[40px] mr-[30px]">
              {selectedImage && (
                <img
                  className="w-[690px] h-[690px] object-cover rounded-lg border border-gray-200"
                  src={selectedImage}
                  alt={product.name}
                />
              )}
            </div>

            {/* Product info */}
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-xl font-bold text-black-800">
                {product.name}
              </h1>
              <div className="my-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold text-black-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </span>
                </div>
                <div className="font-bold text-gray-600">
                  Chất liệu:{" "}
                  <span className="text-red-600">{product.material?.name}</span>
                </div>
                <p className="font-bold text-gray-600">
                  Số lượng:{" "}
                  <span
                    className={`font-semibold ${
                      product.soLuong > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.soLuong > 0
                      ? `${product.soLuong} sản phẩm`
                      : "Hết hàng"}
                  </span>
                </p>
                <p className="font-bold text-gray-500 mt-2">
                  Tình trạng:{" "}
                  <span
                    className={`font-semibold ${
                      product.soLuong > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.soLuong > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>
              </div>

              {/* Average rating display */}
              <div className="my-2">
                <span className="font-bold text-gray-600">Đánh giá: </span>
                <span className="text-yellow-500">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < averageRating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }
                    >
                      &#9733; {/* Star character */}
                    </span>
                  ))}
                </span>
                <span className="text-gray-600">
                  {" "}
                  ({comments.length} đánh giá)
                </span>
              </div>

              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-md border-2 border-transparent px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out ${
                  product.soLuong > 0
                    ? "bg-gray-900 hover:bg-orange-400"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={async () => {
                  if (!product || !product._id) {
                    toast.error("Mã sản phẩm không hợp lệ!", {
                      position: "top-right",
                      autoClose: 3000,
                      theme: "colored",
                    });
                    return;
                  }
                  if (!user || !user.id) {
                    toast.info(
                      "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!",
                      {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                      }
                    );
                    return;
                  }
                  if (product.soLuong <= 0) {
                    toast.warning(
                      "Sản phẩm này đã hết hàng. Vui lòng chọn sản phẩm khác.",
                      {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                      }
                    );
                    return;
                  }

                  const cartItem: Icart = {
                    userId: user.id,
                    items: [
                      {
                        productId: String(product._id),
                        name: product.name,
                        price: product.price,
                        img: product.img[0],
                        quantity: 1,
                      },
                    ],
                  };

                  try {
                    const response = await addtoCart(cartItem);
                    dispatch({ type: actions.ADD, payload: response });
                    toast.success("Sản phẩm đã được thêm vào giỏ hàng!", {
                      position: "top-right",
                      autoClose: 3000,
                      theme: "colored",
                    });
                  } catch (error) {
                    toast.error(
                      "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.",
                      {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "colored",
                      }
                    );
                    console.error(
                      "Không thể thêm sản phẩm vào giỏ hàng",
                      error
                    );
                  }
                }}
                disabled={product.soLuong <= 0}
              >
                {product.soLuong > 0 ? "Add to cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        )}

        {/* Product description */}
        <div>
          {product && (
            <div className="my-6 p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-black mb-4">
                Mô tả sản phẩm
              </h2>
              {product.moTa ? (
                <div className="text-gray-800 text-base leading-relaxed">
                  <div className="img flex gap-2">
                    <img className="w-[50%]" src={product.img[2]} alt="" />
                    <img className="w-[50%]" src={product.img[3]} alt="" />
                  </div>
                  <div className="mota">{product.moTa}</div>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Chưa có mô tả cho sản phẩm này.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Similar products */}
        <div className="border-t-2 border-black mt-[40px]"></div>
        <section className="py-10">
          <h1 className="mb-12 text-center font-sans text-4xl font-bold">
            Sản phẩm tương tự
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 mt-[30px] mb-[50px] px-[20px] md:px-[40px] lg:px-[60px]">
            {products.slice(0, 8).map((product: Iproduct) => (
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
                    <p className="text-sm text-gray-500">
                      {truncateText(product.moTa, 50)}
                    </p>
                    <p className="text-xl font-bold text-red-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
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
        </section>

        <div className="pt-[50px]">
          {user ? (
            <CommentSection
              productId={id || ""}
              user={user}
              averageRating={averageRating} // Pass average rating
            />
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
