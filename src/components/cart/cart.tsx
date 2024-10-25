// import { useContext, useEffect, useState } from "react";
// import { Cartcontext } from "../contexts/cartcontext";
// import { CartItem } from "../../interface/cart";
// import { getCartByID, removeFromCart } from "../../service/cart";

// const Cart = () => {
//     const Globalstate = useContext(Cartcontext);
//     const {state, dispatch} = Globalstate;
//   const [userId, setUserId] = useState<string | null>(null);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);


 

//   useEffect(() => {
//     const userData = sessionStorage.getItem("user");
//     if (userData) {
//       const parsedUser = JSON.parse(userData);
//       console.log("Parsed User Data:", parsedUser); // Log to check user data
//       setUserId(parsedUser.id);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const fetchCartData = async () => {
//         try {
//           const data = await getCartByID(userId);
//           console.log("Fetched Cart Data:", data); // Log full data to inspect the structure
//           if (data && data.items) {
//             setCartItems(data.items);
//           }
//         } catch (error) {
//           console.error("Failed to fetch cart data:", error);
//         }
//       };
//       fetchCartData();
//     }
//   }, [userId]);

  
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


//   const fetchCartData = async () => {
//     if (userId) {
//       try {
//         const data = await getCartByID(userId);
//         console.log("Fetched Cart Data:", JSON.stringify(data, null, 2)); // Log full data structure
  
//         if (data && Array.isArray(data.items)) {
//           setCartItems(data.items);
//           console.log("Cart Items Set:", data.items); // Log the items being set
//         } else {
//           console.error("Items are not available in the cart data.");
//         }
//       } catch (error) {
//         console.error("Failed to fetch cart data:", error);
//       }
//     }
//   };

//   const total = cartItems.reduce((total, item) => {
//     const quantity = item.quantity ?? 0;
//     const price = item.price ?? 0;
//     return total + price * quantity;
//   }, 0);
  
//   return (
    
     

//       <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
//         <div className="grid md:grid-cols-3 gap-4">
//           <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
//             <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
//             <hr className="border-gray-300 mt-4 mb-8" />

//             <div className="space-y-4">
//               <div className="grid grid-cols-3 items-center gap-4">
//               {cartItems.map((item, index) => {
//           const quantity = item.quantity ?? 0;
//           const price = item.price ?? 0;
//         return (
        

//           <div className="card border-2 flex items-center justify-between w-50 mb-4" key={index}>
//             <img className="max-lg:w-full lg:w-[180px] rounded-lg object-cover" src={item.img} alt="" />
//             <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item.name}</p>
//             <p className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">{price} $</p>
//             <div className="quantity">
//               <button
//               className="rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
//                 onClick={() => handleIncrease(item)}>
//                 +
//               </button>
//               <p>{quantity}</p>
//               <button
//               className="rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
//                 onClick={() => handleDecrease(item)}>
//                 -
//               </button>
//             </div>
//             <button className="pr-[30px] text-[39px]" onClick={() => handleRemove(item)}>
//               x
//             </button>
//           </div>
//         );
//       })}
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
//             <div className="flex border border-blue-600 overflow-hidden rounded-md">
//               <input
//                 type="email"
//                 placeholder="Promo code"
//                 className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
//               />
//               <button
//                 type="button"
//                 className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
//               >
//                 Apply
//               </button>
//             </div>

//             <ul className="text-gray-800 mt-8 space-y-4">
//               <li className="flex flex-wrap gap-4 text-base">
//                 Discount <span className="ml-auto font-bold">$0.00</span>
//               </li>
//               <li className="flex flex-wrap gap-4 text-base">
//                 Shipping <span className="ml-auto font-bold">$2.00</span>
//               </li>
//               <li className="flex flex-wrap gap-4 text-base">
//                 Tax <span className="ml-auto font-bold">$4.00</span>
//               </li>
//               <li className="flex flex-wrap gap-4 text-base font-bold">
//                 Total <span className="ml-auto">$52.00</span>
//               </li>
//             </ul>

//             <div className="mt-8 space-y-2">
//               <button
//                 type="button"
//                 className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//               >
//                 Checkout
//               </button>
//               <button
//                 type="button"
//                 className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
//               >
//                 Continue Shopping{" "}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
    
//   );
// };

// export default Cart;



import { useContext, useEffect, useState } from "react";
import { Cartcontext } from "../contexts/cartcontext";
import { CartItem } from "../../interface/cart";
import { getCartByID, removeFromCart } from "../../service/cart";


const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const {state, dispatch} = Globalstate;
  const [userId, setUserId] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleRemove = async (item: CartItem) => {
    try {
      const updatedCart = await removeFromCart(userId as string, item.productId);
      setCartItems(updatedCart.items); // Update the local cart state after removal
      console.log(item.productId, "item id");
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  
  
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserId(parsedUser.id); 
    }
  }, []);

  useEffect(() => {
    if(userId) {
      const fetchCartData = async () => {
        try {
          const data = await getCartByID(userId)
          if (data) {
            setCartItems(data.items)
          }
        }
        catch (error) {
          console.log(error);
          
        }
      }
      fetchCartData()
    }
  },[userId])

  const handleIncrease = (item: CartItem) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.productId === item.productId ? { ...cartItem, quantity: (cartItem.quantity ?? 0) + 1 } : cartItem
    );
    setCartItems(updatedItems);
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity && item.quantity > 1) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem.productId === item.productId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
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
    <div className="cart">
      <div className="flex justify-between">
      <h1>Shopping cart</h1>
     
        <div className="total pr-[200px]">
          <h2>Tong tien: </h2>
          <h2 className="pl-[20px]">{total} $</h2>
        </div>
      
      </div>
        
      {cartItems.map((item, index) => {
          const quantity = item.quantity ?? 0;
          const price = item.price ?? 0;
        return (
        

          <div className="card border-2 flex items-center justify-between w-50 mb-4" key={index}>
            <img className="max-lg:w-full lg:w-[180px] rounded-lg object-cover" src={item.img} alt="" />
            <p className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item.name}</p>
            <p className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">{price} $</p>
            <div className="quantity">
              <button
              className="rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                onClick={() => handleIncrease(item)}>
                +
              </button>
              <p>{quantity}</p>
              <button
              className="rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
                onClick={() => handleDecrease(item)}>
                -
              </button>
            </div>
            <button className="pr-[30px] text-[39px]" onClick={() => handleRemove(item)}>
              x
            </button>
          </div>
        );
      })}
      
    </div>
  );
};

export default Cart;