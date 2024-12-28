// export interface IOrder {
//     _id: string;
//     userId: { name: string; email: string };
//     items: {
//       productId: { name: string; price: number; img: string[] };
//       name: string;
//       price: number;
//       quantity: number;
//     }[];
//     amount: number;
//     status: string;
//     paymentstatus: string;
//     createdAt: string;
//     customerDetails: {
//       name: string;
//       phone: string;
//       email: string;
//       address: string;
//       notes?: string;
//     }

import { CartItem } from "./cart";

// }
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