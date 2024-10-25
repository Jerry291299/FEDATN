import { IUserCart } from "./user";

export interface Icart {
  userId: string;
  items: CartItem[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}
// export type ICartLite = Pick<Icart,'userId' | 'items' >