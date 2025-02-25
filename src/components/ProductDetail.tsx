import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Iproduct, IVariant } from "../interface/products";
import { IUser } from "../interface/user";
import { addtoCart } from "../service/cart";
import {
  getAllproducts,
  getProductByID,
  calculateTotalQuantity,
} from "../service/products";
import Header from "./Header";
import Footer from "./Footer";
import { actions, Cartcontext } from "./contexts/cartcontext";
import { Icart } from "../interface/cart";
import CommentSection from "../components/CommentProduct";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Iproduct | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null); // New state for selected variant
  const Globalstate = useContext(Cartcontext);
  const [user, setUser] = useState<IUser | null>(null);
  const [comments, setComments] = useState<{ stars: number }[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

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
        setComments(data.comments || []);
        // Set the first variant as the default selected variant
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(0);
        }
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

  const handleVariantChange = (index: number) => {
    setSelectedVariant(index);
    if (product && product.img && product.img[index]) {
      setSelectedImage(product.img[index]); // Change image based on selected variant
    }
  };

  const calculateTotalQuantity = (
    variants: IVariant[] = [],
    selectedVariantIndex: number | null
  ): number => {
    if (!variants || selectedVariantIndex === null) return 0;

    const selectedVariant = variants[selectedVariantIndex];
    return selectedVariant ? selectedVariant.quantity : 0; // Assuming each variant has a 'quantity' property
  };
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

              {/* Display product variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="my-4">
                  <h2 className="text-lg font-medium">Kích thước:</h2>
                  <div className="flex gap-4 overflow-x-auto">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 rounded-md ${
                          selectedVariant === index
                            ? "bg-blue-200"
                            : "bg-white text-black"
                        }`}
                        onClick={() => handleVariantChange(index)}
                        aria-pressed={selectedVariant === index}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="my-4">
                <div className="flex items-baseline">
                  <span className="text-xl font-semibold text-red-600">
                    {"Giảm giá : "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      product.variants && selectedVariant !== null
                        ? product.variants[selectedVariant].discount || 0 // Use discount if available
                        : 0
                    )}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-semibold text-black-600">
                  {"Giá  : "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      product.variants && selectedVariant !== null
                        ? product.variants[selectedVariant].price -
                            (product.variants[selectedVariant].discount || 0) // Calculate total
                        : 0
                    )}
                  </span>
                </div>

                <p className="font-bold text-gray-600">
                  Số lượng:{" "}
                  <span
                    className={`font-semibold ${
                      calculateTotalQuantity(
                        product.variants,
                        selectedVariant
                      ) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {calculateTotalQuantity(product.variants, selectedVariant) >
                    0
                      ? `${calculateTotalQuantity(
                          product.variants,
                          selectedVariant
                        )} sản phẩm`
                      : "Hết hàng"}
                  </span>
                </p>
                <p className="font-bold text-gray-500 mt-2">
                  Tình trạng:{" "}
                  <span
                    className={`font-semibold ${
                      calculateTotalQuantity(
                        product.variants,
                        selectedVariant
                      ) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {calculateTotalQuantity(product.variants, selectedVariant) >
                    0
                      ? "Còn hàng"
                      : "Hết hàng"}
                  </span>
                </p>
              </div>
              <div className="font-bold text-gray-600">
                Chất liệu:{" "}
                <span className="text-red-600">{product.material?.name}</span>
              </div>

              <button
  type="button"
  className={`inline-flex items-center justify-center rounded-md border-2 border-transparent px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out ${
    calculateTotalQuantity(product.variants, selectedVariant) > 0
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
      toast.info("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    if (calculateTotalQuantity(product.variants, selectedVariant) <= 0) {
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
          price:
            product.variants && selectedVariant !== null
              ? product.variants[selectedVariant].price
              : 0,
          img: product.img[0],
          quantity: 1,
          size:
            product.variants && selectedVariant !== null
              ? product.variants[selectedVariant].size
              : "N/A",
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
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("Sản phẩm đã có trong giỏ hàng!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.error(
          "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
      }
      console.error("Không thể thêm sản phẩm vào giỏ hàng", error);
    }
  }}
  disabled={calculateTotalQuantity(product.variants, selectedVariant) <= 0}
>
  {calculateTotalQuantity(product.variants, selectedVariant) > 0
    ? "Add to cart"
    : "Out of Stock"}
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

        {/* Bảo hành và vận chuyển */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-blue-600">
              Chính Sách Bảo hành & Vận chuyển
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Bảo hành</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Các sản phẩm nội thất Beautiful House đã đều được sản xuất tại
                  nhà máy của chúng tôi với dây chuyền hiện đại.
                </li>
                <li>
                  Beautiful House bảo hành 1 năm cho các trường hợp lỗi về kỹ
                  thuật.
                </li>
                <li>
                  Khách hàng không nên tự sửa chữa mà hãy báo ngay cho Beautiful
                  House qua số điện thoại 0344357227.
                </li>
                <li>
                  Sau thời gian hết bảo hành, nếu quý khách có bất kỳ câu hỏi
                  thắc mắc nào, hãy liên hệ với Beautiful House để được hướng
                  dẫn và giải quyết các vấn đề phát sinh.
                </li>
                <li className="text-red-600">
                  Beautiful House không bảo hành cho các trường hợp sau: Khách
                  hàng tự sửa chữa khi sản phẩm bị trục trặc mà không báo cho
                  Beautiful House.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Vận chuyển</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Beautiful House cung cấp dịch vụ giao hàng tận nơi, lắp ráp và
                  sắp xếp vị trí theo yêu cầu của khách hàng.
                </li>
                <li>
                  Miễn phí giao hàng trong các quận nội thành phố Hà Nội cho các
                  đơn hàng trị giá trên 10 triệu.
                </li>
                <li>
                  Đối với khu vực các tỉnh lân cận: Phí vận chuyển sẽ được tính
                  toán dựa trên khoảng cách.
                </li>
              </ul>
            </div>
          </div>
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
                      }).format(
                        product.variants && product.variants.length > 0
                          ? product.variants[0].price
                          : 0
                      )}
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
