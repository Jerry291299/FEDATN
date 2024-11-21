import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    DeactivateProduct,
    ActivateProduct,
    getAllproducts,
} from "../../service/products";
import { Iproduct } from "../../interface/products";
import { Pagination, Popconfirm } from "antd";
import LoadingComponent from "../Loading";

type Props = {};

const Dashboard = (props: Props) => {
    const [products, setProduct] = useState<Iproduct[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [filterName, setFilterName] = useState<string>(""); // State để lưu giá trị lọc theo tên
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [pageConfig, setPageConfig] = useState<any>();
    const [page, setPage] = useState<any>({
        limit: 5,
        currentPage: 1,
    });

    const fetchData = async (currentPage: number) => {
        try {
            setLoading(true);
            const data = await getAllproducts({
                limit: page.limit,
                page: currentPage,
            });
            setProduct(data?.docs);
            setPageConfig(data);
            console.log(data?.docs, "data");
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(1);
    }, []);

    const updateProduct = (id: string) => {
        navigate(`update/${id}`);
    };

    // Xử lý khi người dùng chuyển trang
    const handlePageChange = (currentPage: number) => {
        setPage((prev: any) => {
            return { ...prev, currentPage: currentPage };
        });
        fetchData(currentPage || 0);
    };

    // Hàm cập nhật trạng thái sản phẩm
    const toggleProductStatus = async (id: string, status: boolean) => {
        try {
            // Kiểm tra trạng thái hiện tại của sản phẩm và gọi API thích hợp
            if (status) {
                await DeactivateProduct(id); // Gọi API để vô hiệu hóa sản phẩm
            } else {
                await ActivateProduct(id); // Gọi API để kích hoạt sản phẩm
            }

            // Cập nhật lại trạng thái của sản phẩm trong danh sách
            const updatedProducts = products.map((product) =>
                product._id === id
                    ? {
                          ...product,
                          status: !status, // Đảo ngược trạng thái boolean: từ "active" sang "deactive" và ngược lại
                      }
                    : product
            );

            setProduct(updatedProducts); // Cập nhật lại danh sách sản phẩm sau khi thay đổi trạng thái
        } catch (error) {
            console.error("Error toggling product status:", error);
            // Xử lý lỗi nếu có
        }
    };

    // Lọc danh sách sản phẩm dựa trên tên sản phẩm
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(filterName.toLowerCase()) &&
            (selectedCategory === "" ||
                product.category.name.toLowerCase() ===
                    selectedCategory.toLowerCase())
    );
    // Tạo một mảng mới chứa các danh mục duy nhất
    const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category.name))
    );

    return (
        <>
            {loading && <LoadingComponent />}
            <NavLink to={"/admin/add"}>
                <button className=" focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm text-clip overflow-hidden px-5 py-2.5 me-2 mb-2">
                    Thêm mới
                </button>
            </NavLink>

            {/* lọc sản phẩm theo danh mục */}
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <div className="mb-[20px] flex flex-col w-full">
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block w-full px-0">
                        <div className="overflow-hidden">
                            <table className="min-w-full table-auto">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Stt
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Tên Sản Phẩm
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Giá
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Danh mục
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Chất Liệu
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Số lượng
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Mô tả
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Ảnh
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Trạng Thái
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                        >
                                            Handle
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map(
                                        (product: Iproduct, index: number) => (
                                            <tr
                                                className="bg-gray-100 border-b"
                                                key={product._id}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {new Intl.NumberFormat(
                                                        "vi-VN",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    ).format(product.price)}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product?.category?.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm truncate text-gray-900 max-w-xs">
                                                    {product?.material?.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.soLuong}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.moTa.length > 50
                                                        ? `${product.moTa.substring(
                                                              0,
                                                              20
                                                          )}...`
                                                        : product.moTa}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <img
                                                        className="w-[100px]"
                                                        src={product?.img[0]}
                                                        alt=""
                                                    />
                                                </td>
                                                <td
                                                    className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ${
                                                        product.status === true
                                                            ? "text-green-700"
                                                            : "text-red-700"
                                                    }`}
                                                >
                                                    {product.status === true
                                                        ? "Hoạt động"
                                                        : "Vô hiệu hóa"}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() =>
                                                            updateProduct(
                                                                product._id
                                                            )
                                                        }
                                                        type="button"
                                                        className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* Nút Active/Deactive */}
                                                    <Popconfirm
                                                        title="Are you sure?"
                                                        onConfirm={() =>
                                                            toggleProductStatus(
                                                                product._id,
                                                                product.status
                                                            )
                                                        }
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <button
                                                            type="button"
                                                            className={`focus:outline-none text-white ${
                                                                product.status ===
                                                                true
                                                                    ? "bg-red-700 hover:bg-red-800"
                                                                    : "bg-green-700 hover:bg-green-800"
                                                            } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                                                        >
                                                            {product.status ===
                                                            true
                                                                ? "Deactive"
                                                                : "Active"}
                                                        </button>
                                                    </Popconfirm>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                align="end"
                onChange={handlePageChange}
                pageSize={pageConfig?.limit}
                total={pageConfig?.totalDocs || 0}
                current={page.currentPage}
            />
        </>
    );
};

export default Dashboard;
