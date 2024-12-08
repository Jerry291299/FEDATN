import { axiosservice } from '../config/API';

export const createVNPayPayment = async ({userId,  paymentMethod, customerDetails, items, amount}: {
  userId: string,  paymentMethod: string, customerDetails: any, items: any, amount: any
}) => {
  try {
    console.log("VNPay payment data:", { userId, paymentMethod, customerDetails, items, amount });
    
    const response = await axiosservice.post("/create-payment", { userId, paymentMethod, customerDetails, items, amount});
    return response.data.paymentUrl;
  } catch (error) {
    console.error("Failed to create VNPay payment:", error);
    throw error;
  }
};