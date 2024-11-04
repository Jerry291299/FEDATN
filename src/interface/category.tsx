export interface Icategory{
    _id: string,
    name: string,
    status: 'active' | 'deactive'; // Thêm trường status
}
export type IcategoryLite = Pick<Icategory, 'name' >