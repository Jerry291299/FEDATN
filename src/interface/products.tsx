import { Icategory } from "./category";
import { IMaterial } from "./material";

export interface Iproduct {
    _id: string;
    name: string;
    img: string[];
    price: number;
    soLuong: number;
    moTa: string;
    category: Icategory;
    material: IMaterial;
    status: boolean;
}
export type IProductLite = Pick<
    Iproduct,
    "_id" | "name" | "img" | "price" | "category" | "material" | "status" | "soLuong" | "moTa"
>;
