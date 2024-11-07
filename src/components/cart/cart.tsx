import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../contexts/cartcontext";
import { CartItem } from "../../interface/cart";
import { getCartByID, removeFromCart } from "../../service/cart";
import Header from "../Header";
import Footer from "../Footer";
import { NavLink, useParams } from "react-router-dom";

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const { state, dispatch } = Globalstate;
  const [userId, setUserId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { id } = useParams();
  const handleRemove = async (item: CartItem) => {
    try {
      const updatedCart = await removeFromCart(
        userId as string,
        item.productId
      );
      setCartItems(updatedCart.items); // Update the local cart state after removal
      console.log(item.productId, "item id");
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const fetchCartData = async (userId: string) => {
    try {
      console.log(userId);

      const data = await getCartByID(userId);
      if (data) {
        setCartItems(data.items);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const { id } = JSON.parse(userData);

      console.log(id);

      if (id) {
        fetchCartData(id);
        setUserId(id);
      }

    }
  }, [userId]);

  const handleIncrease = (item: CartItem) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.productId === item.productId
        ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 }
        : cartItem
    );
    setCartItems(updatedItems);
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity && item.quantity > 1) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedItems);
    } else {
      handleRemove(item);
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
                  {cartItems.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-300"
                    >
                      {/* Remove Button */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-red-500 hover:text-red-600 transition-colors duration-200 text-xl"
                          aria-label={`Remove ${item.name}`}
                        >
                          &times;
                        </button>
                      </td>
                      {/* Product Image */}
                      <td className="p-4">
                        <div className="w-20 h-20 shrink-0 bg-white p-2 rounded-md border border-gray-200">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </td>

                      {/* Product Name */}
                      <td className="p-4 text-gray-700 font-medium">
                        {item.name}
                      </td>

                      {/* Quantity Controls */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-200"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>
                          <span className="text-gray-800 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-200"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Price Display */}
                      <td className="p-4 text-lg font-semibold text-gray-800">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="border-gray-300 mb-6" />
            </div>
            <div className="flex items-center border border-blue-500 rounded-md overflow-hidden shadow-md mb-6 mt-6">
              <input
                type="text"
                placeholder="Enter Promo Code"
                className="w-full px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <button
                type="button"
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Apply
              </button>
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
        </div></div>
      <Footer />
    </>
  );
};

export default Cart;

// import { useContext, useEffect, useState } from "react";
// import { Cartcontext } from "../contexts/cartcontext";
// import { CartItem } from "../../interface/cart";
// import { getCartByID, removeFromCart } from "../../service/cart";

// const Cart = () => {
//   const Globalstate = useContext(Cartcontext);
//   const { state, dispatch } = Globalstate;
//   const [userId, setUserId] = useState<string | null>(null);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   const handleRemove = async (item: CartItem) => {
//     try {
//       const updatedCart = await removeFromCart(
//         userId as string,
//         item.productId
//       );
//       setCartItems(updatedCart.items); // Update the local cart state after removal
//       console.log(item.productId, "item id");
//     } catch (error) {
//       console.error("Failed to remove item:", error);
//     }
//   };

//   const fetchCartData = async (userId: string) => {
//     try {
//       console.log(userId);

//       const data = await getCartByID(userId);
//       if (data) {
//         setCartItems(data.items);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const userData = sessionStorage.getItem("user");
//     if (userData) {
//       const {info} = JSON.parse(userData);

//       console.log(info.id);

//       if (info.id) {
//         fetchCartData(info.id);
//         setUserId(info.id);
//       }
//     }
//   }, [userId]);

//   const handleIncrease = (item: CartItem) => {
//     const updatedItems = cartItems.map((cartItem) =>
//       cartItem.productId === item.productId
//         ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 }
//         : cartItem
//     );
//     setCartItems(updatedItems);
//   };

//   const handleDecrease = (item: CartItem) => {
//     if (item.quantity && item.quantity > 1) {
//       const updatedItems = cartItems.map((cartItem) =>
//         cartItem.productId === item.productId
//           ? { ...cartItem, quantity: cartItem.quantity - 1 }
//           : cartItem
//       );
//       setCartItems(updatedItems);
//     } else {
//       handleRemove(item);
//     }
//   };

//   const total = cartItems.reduce((total, item) => {
//     const quantity = item.quantity ?? 0;
//     const price = item.price ?? 0;
//     return total + price * quantity;
//   }, 0);

//   return (
//     <div className="cart">
//       <div className="flex justify-between">
//         <h1>Shopping cart</h1>

//         <div className="total pr-[200px]">
//           <h2>Tong tien: </h2>
//           <h2 className="pl-[20px]">{total} $</h2>
//         </div>
//       </div>

//       {cartItems.map((item, index) => {
//         const quantity = item.quantity ?? 0;
//         const price = item.price ?? 0;
//         return (
//           <div
//             className="card border-2 flex items-center justify-between w-50 mb-4"
//             key={index}
//           >
//             <img
//               className="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
//               src={item.img}
//               alt=""
//             />
//             <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">
//               {item.name}
//             </p>
//             <p className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
//               {price} $
//             </p>
//             <div className="quantity">
//               <button
//                 className="rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
//                 onClick={() => handleIncrease(item)}
//               >
//                 +
//               </button>
//               <p>{quantity}</p>
//               <button
//                 className="rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
//                 onClick={() => handleDecrease(item)}
//               >
//                 -
//               </button>
//             </div>
//             <button
//               className="pr-[30px] text-[39px]"
//               onClick={() => handleRemove(item)}
//             >
//               x
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Cart;
