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
    paymentstatus: string;
    createdAt: string;
    cancelReason:{
    reason: String , // Lý do hủy đơn
    canceledAt:  Date , // Thời điểm hủy
    canceledBy: String , // Người thực hiện hủy
    }
    customerDetails: {
      name: string;
      phone: string;
      email: string;
      address: string;
      notes?: string;
      
    }
}