import { axiosservice } from '../config/API';

export const createVNPayPayment = async (orderId: string, amount: number) => {
  try {
    const response = await axiosservice.post("/create-payment", { orderId, amount });
    return response.data.paymentUrl;
  } catch (error) {
    console.error("Failed to create VNPay payment:", error);
    throw error;
  }
};