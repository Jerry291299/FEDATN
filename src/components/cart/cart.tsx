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
      <div className="w-full font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-8 px-4 md:px-8 rounded-lg shadow-md">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Shopping Cart
            </h2>
            <hr className="border-gray-300 mb-6" />

            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-sm text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          className="rounded-full border border-gray-300 p-2 bg-gray-50 hover:bg-gray-100 transition duration-200"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <span className="text-gray-800 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="rounded-full border border-gray-300 p-2 bg-gray-50 hover:bg-gray-100 transition duration-200"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.price} ₫
                  </h4>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md md:sticky top-0">
            <div className="flex border border-blue-500 rounded-md overflow-hidden mb-6">
              <input
                type="text"
                placeholder="Promo code"
                className="w-full px-4 py-2 text-gray-600 bg-white focus:outline-none"
              />
              <button
                type="button"
                className="px-4 text-white bg-blue-600 hover:bg-blue-700 font-semibold transition duration-200"
              >
                Apply
              </button>
            </div>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex justify-between text-base">
                <span>Discount</span>
                <span className="font-bold">$0.00</span>
              </li>
              <li className="flex justify-between text-base">
                <span>Shipping</span>
                <span className="font-bold">$2.00</span>
              </li>
              <li className="flex justify-between text-base">
                <span>Tax</span>
                <span className="font-bold">$4.00</span>
              </li>
              <li className="flex justify-between text-lg font-semibold border-t border-gray-300 pt-3 mt-2">
                <span>Total</span>
                <span>{total} ₫</span>
              </li>
            </ul>

            <div className="space-y-4">
              <NavLink
                to={"/#"}
                className="block w-full py-3 font-semibold text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Checkout
              </NavLink>

              <NavLink
                to={"/products"}
                className="block w-full py-3 font-semibold text-center text-gray-700 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-200"
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
