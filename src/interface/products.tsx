import { Icategory } from "./category";
import { IMaterial } from "./material";


export interface IVariant {
  size: string; 
  quantity: number; 
  price: number; 
  discount?: number; 
  createdAt?: string;
  updatedAt?: string;
}


export interface Iproduct {
  _id: string; 
  masp: string;
  name: string; 
  img: string[];
  moTa: string; 
  brand: string;
  category: Icategory; 
  material: IMaterial; 
  status: boolean;
  variants?: IVariant[]; 
  discountCode?: string; 
  createdAt?: string;
  updatedAt?: string; 
}


export type IProductLite = Pick<
  Iproduct,
  | "_id"
  | "masp"
  | "name"
  | "img"
  | "category"
  | "material"
  | "status"
  | "moTa"
  | "brand"
  | "updatedAt"
  | "variants" 
  | "discountCode" 
  |"createdAt"
  |"updatedAt"
> & {
  price?: number; 
  soLuong?: number; 
};
