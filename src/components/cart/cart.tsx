import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../contexts/cartcontext";
import { CartItem } from "../../interface/cart";
import { getCartByID, removeFromCart, updateCartQuantity } from "../../service/cart";
import Header from "../Header";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);  // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch cart data based on user ID
  const fetchCartData = async (userId: string) => {
    setLoading(true);
    try {
      const data = await getCartByID(userId);
      if (data) {
        setCartItems(data.items);
      }
    } catch (err) {
      setError("Failed to fetch cart data.");
      console.error("Error fetching cart data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const { id } = JSON.parse(userData);
      if (id) {
        setUserId(id);
        fetchCartData(id);
      }
    }
  }, []);  // Run only once when the component is mounted

  const handleRemove = async (item: CartItem) => {
    try {
      const updatedCart = await removeFromCart(userId as string, item.productId);
      setCartItems(updatedCart.items);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };
  const handleIncrease = async (item: CartItem) => {
    try {
      console.log("Increasing quantity for:", item);
  
      // Gọi API để lấy chi tiết sản phẩm
      const response = await fetch(`http://localhost:28017/api/products/${item.productId}`);
      const text = await response.text(); // Đọc phản hồi dưới dạng text
  
      // Kiểm tra nếu phản hồi không phải JSON
      if (response.ok && text.startsWith("{")) {
        let product;
        try {
          product = JSON.parse(text); // Chuyển text thành JSON nếu có thể
          console.log("Product details:", product);
          
          if (item.quantity + 1 > product.soLuong) {
            alert("Sản phẩm không đủ số lượng để thêm vào giỏ hàng.");
            return;
          }
  
          // Cập nhật giỏ hàng cục bộ
          const updatedItems = cartItems.map((cartItem) =>
            cartItem.productId === item.productId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          setCartItems(updatedItems);
  
          // Cập nhật số lượng trên server
          const updateResponse = await fetch(`http://localhost:28017/api/cart/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: item.productId,
              quantity: item.quantity + 1,
            }),
          });
  
          if (!updateResponse.ok) {
            throw new Error(`Failed to update cart quantity: ${updateResponse.statusText}`);
          }
  
          console.log("Cart updated successfully");
        } catch (parseError) {
          throw new Error("Failed to parse product details as JSON.");
        }
      } else {
        throw new Error("Received invalid response, expected JSON.");
      }
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau.");
    }
  };
  

  const handleDecrease = async (item: CartItem) => {
    try {
      if (item.quantity && item.quantity > 1) {
        const updatedItems = cartItems.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        setCartItems(updatedItems);
        await updateCartQuantity(userId as string, item.productId, item.quantity - 1);
      } else {
        handleRemove(item);
      }
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
    }
  };

  const total = cartItems.reduce((total, item) => {
    const quantity = item.quantity ?? 0;
    const price = item.price ?? 0;
    return total + price * quantity;
  }, 0);

  return (
    <>
      <Header />
      <div className="w-full font-sans mt-6 md:max-w-7xl max-md:max-w-xl mx-auto bg-white py-8 px-4 md:px-8 rounded-lg shadow-md">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Shopping Cart
            </h2>
            <hr className="border-gray-300 mb-6" />

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-4 font-semibold text-gray-700"></th>
                    <th className="p-4 font-semibold text-gray-700"></th>
                    <th className="p-4 font-semibold text-gray-700 uppercase">
                      Product
                    </th>
                    <th className="p-4 font-semibold text-gray-700 uppercase">
                      Quantity
                    </th>
                    <th className="p-4 font-semibold text-gray-700 uppercase">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center">Your cart is empty</td>
                    </tr>
                  ) : (
                    cartItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition duration-300">
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleRemove(item)}
                            className="text-red-500 hover:text-red-600 transition-colors duration-200 text-xl"
                            aria-label={`Remove ${item.name}`}
                          >
                            &times;
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="w-20 h-20 shrink-0 bg-white p-2 rounded-md border border-gray-200">
                            <img
                              src={item?.img ? item.img[0] : "/default-image.png"}  // Handle null image
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 font-medium">{item.name}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <button
                              className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-200"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </button>
                            <span className="text-gray-800 font-medium">{item.quantity}</span>
                            <button
                              className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-200"
                              onClick={() => handleIncrease(item)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-lg font-semibold text-gray-800">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <hr className="border-gray-300 mb-6" />
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md md:sticky top-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cart Totals
            </h2>
            <hr className="border-gray-300 mb-6" />
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex justify-between text-base">
                <span>Discount</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(0)}
                </span>
              </li>
              <li className="flex justify-between text-base">
                <span>Shipping</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(2000)}
                </span>
              </li>
              <li className="flex justify-between text-base">
                <span>Tax</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(4000)}
                </span>
              </li>
              <li className="flex justify-between text-lg font-semibold border-t border-gray-300 pt-3 mt-2">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </span>
              </li>
            </ul>

            <div className="space-y-4">
              <NavLink
                to={"/order"}
                className="block w-full py-3 font-semibold text-center text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Checkout
              </NavLink>

              <NavLink
                to={"/products"}
                className="block w-full py-3 font-semibold text-center text-gray-700 border border-gray-300 rounded-lg bg-white shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Continue Shopping
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
