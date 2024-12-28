import { Icategory } from "./category";
import { IMaterial } from "./material";

// Interface cho biến thể sản phẩm
export interface IVariant {
  size: string; // Kích thước của biến thể
  quantity: number; // Số lượng của biến thể
  price: number; // Giá của biến thể
  discount?: number; // Giảm giá (phần trăm)
}

// Cập nhật giao diện sản phẩm
export interface Iproduct {
  _id: string; // ID sản phẩm
  name: string; // Tên sản phẩm
  img: string[]; // Mảng URL ảnh sản phẩm
  moTa: string; // Mô tả sản phẩm
  category: Icategory; // Danh mục sản phẩm
  material: IMaterial; // Chất liệu sản phẩm
  status: boolean; // Trạng thái sản phẩm
  updatedAt?: string; // Thời gian cập nhật
  variants?: IVariant[]; // Mảng chứa các biến thể sản phẩm
  discountCode?: string; // Mã giảm giá
}

// Định nghĩa loại sản phẩm
export type IProductLite = Pick<
  Iproduct,
  | "_id"
  | "name"
  | "img"
  | "category"
  | "material"
  | "status"
  | "moTa"
  | "updatedAt"
  | "variants" // Thêm biến thể vào loại sản phẩm nhẹ
  | "discountCode" // Thêm mã giảm giá vào loại sản phẩm nhẹ
> & {
  price?: number; // Giá sẽ được tính từ biến thể
  soLuong?: number; // Tổng số lượng có thể tính từ các biến thể
};
