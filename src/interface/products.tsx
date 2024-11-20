import { Icategory } from "./category";

export interface Iproduct {
    _id: string;
    name: string;
    img: string[];
    price: number;
    soLuong: number;
    moTa: string;
    category: Icategory;
    status: boolean;
}
export type IProductLite = Pick<
    Iproduct,
    "_id" | "name" | "img" | "price" | "category" | "status" | "moTa"
>;