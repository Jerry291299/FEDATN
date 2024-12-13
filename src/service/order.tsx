import { axiosservice } from '../config/API';
import { CartItem } from '../interface/cart';

export interface IOrderData {
    userId: string;
    items: CartItem[];
    amount: number;
    paymentMethod: string;
    customerDetails: {   // Add customer details to the interface
      name: string;
      phone: string;
      email: string;
      address: string;
      notes: string;
    };
  }
  export interface IOrder {
    _id: string;
    userId: { name: string; email: string };
    items: {
      productId: { name: string; price: number; img: string[] };
      name: string;
      price: number;
      quantity: number;
    }[];
    amount: number;
    status: string;
    createdAt: string;
    customerDetails: {
      name: string;
      phone: string;
      email: string;
      address: string;
      notes?: string;
    };
  }
  export interface IOrderShipper {
    paymentstatus: string;
    _id: string;
    userId: { name: string; email: string };
    items: {
      productId: { _id: string;name: string; price: number; img: string[] };
      name: string;
      price: number;
      quantity: number;
    }[];
    amount: number;
    status: string;
    createdAt: string;
    customerDetails: {
      name: string;
      phone: string;
      email: string;
      address: string;
      notes?: string;
    };
    paymentMethod: string;
  }
  
  

// Function to submit the order
export const placeOrder = async (orderData: IOrderData) => {
  try {
    const response = await axiosservice.post('/order/confirm', orderData);
    return response.data; // Returns the order confirmation or status
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};



export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await axiosservice.get(`/orders/${userId}`);
    return response.data.orders;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};