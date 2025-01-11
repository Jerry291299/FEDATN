import { IUserCart } from "./user";

export interface Icart {
    userId: string;
    items: {
      productId: string;
      name: string;
      price: number;
      quantity: number;
      size?: string;
      img: string;
    }[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  img: string;
}
// export type ICartLite = Pick<Icart,'userId' | 'items' >