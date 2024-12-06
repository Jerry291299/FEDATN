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
// import { CSVLink } from "react-csv";

type Props = {};

const Dashboard = (props: Props) => {
  const [products, setProduct] = useState<Iproduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filterMaterial, setFilterMaterial] = useState<string>(""); // State để lọc theo chất liệu
  const [filterPrice, setFilterPrice] = useState<[number, number]>([
    0, 100000000,
  ]); // State để lọc theo giá (ví dụ giá từ 0 đến 100000)

  const [filterName, setFilterName] = useState<string>(""); // State để lưu giá trị lọc theo tên
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageConfig, setPageConfig] = useState<any>();
  const [page, setPage] = useState<any>({
    limit: 5,
    currentPage: 1,
  });
  const filterByName = (products: Iproduct[], name: string): Iproduct[] => {
    return name.trim() === ""
      ? products
      : products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
  };
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
  // Lọc sản phẩm theo giá
  const filterByPrice = (
    products: Iproduct[],
    minPrice: number,
    maxPrice: number
  ): Iproduct[] => {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

  // Lọc sản phẩm theo chất liệu
  const filterByMaterial = (
    products: Iproduct[],
    material: string
  ): Iproduct[] => {
    return material === ""
      ? products
      : products.filter(
        (product) =>
          product.material?.name?.toLowerCase() === material.toLowerCase()
      );
  };

  // Lọc sản phẩm theo danh mục
  const filterByCategory = (
    products: Iproduct[],
    category: string
  ): Iproduct[] => {
    return category === ""
      ? products
      : products.filter(
        (product) =>
          product.category?.name?.toLowerCase() === category.toLowerCase()
      );
  };
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Lọc theo giá
    filtered = filterByPrice(filtered, filterPrice[0], filterPrice[1]);

    // Lọc theo chất liệu
    filtered = filterByMaterial(filtered, filterMaterial);

    // Lọc theo danh mục
    filtered = filterByCategory(filtered, selectedCategory);
    // Lọc theo tên
    filtered = filterByName(filtered, filterName);
    return filtered;
  };

  // Tạo một mảng mới chứa các danh mục duy nhất
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category.name))
  );
  //   const csvData = filteredProducts.map((products) => ({
  //     ID: products._id,
  //     "Tên sản phẩm": products.name,
  //     "Gía sản phẩm": products.price,
  //     "Tên danh mục": products.category.name,
  //     "Tên chất liệu": products.material,
  //     "Số lượng sản phẩm": products.soLuong,
  //     "Mô tả sản phẩm": products.moTa,
  //     "Anh sản phẩm": products.img,
  //     "Trạng thái": products.status === "active" ? "Hoạt động" : "Vô hiệu hóa",
  //   }));

  return (
    <>
      {loading && <LoadingComponent />}
      <NavLink to={"/admin/add"}>
        <button className=" focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm text-clip overflow-hidden px-5 py-2.5 me-2 mb-2">
          Thêm mới
        </button>
      </NavLink>
      {/* Export button
      <CSVLink
        data={csvData}
        filename={"products.csv"}
        className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        target="_blank"
      >
        Xuất Chất liệu
      </CSVLink> */}

      {/* lọc sản phẩm theo danh mục */}
      <div className="mb-4 flex gap-4 items-center">
        {/* Lọc theo danh mục */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Lọc theo chất liệu */}
        <select
          value={filterMaterial}
          onChange={(e) => setFilterMaterial(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Materials</option>
          {Array.from(new Set(products.map((p) => p.material?.name))).map(
            (material) => (
              <option key={material} value={material}>
                {material}
              </option>
            )
          )}
        </select>

        {/* Lọc theo khoảng giá */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filterPrice[0]}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value)); // Không cho phép giá trị âm
              setFilterPrice([value, filterPrice[1]]);
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || isNaN(Number(e.key))) e.preventDefault(); // Chặn nhập số âm và ký tự không hợp lệ
            }}
            className="p-2 border border-gray-300 rounded w-[120px]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filterPrice[1]}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value)); // Không cho phép giá trị âm
              setFilterPrice([filterPrice[0], value]);
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || isNaN(Number(e.key))) e.preventDefault(); // Chặn nhập số âm và ký tự không hợp lệ
            }}
            className="p-2 border border-gray-300 rounded w-[120px]"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên sản phẩm"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
          
        </div>
      </div>

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
                  {getFilteredProducts().map(
                    (product: Iproduct, index: number) => (
                      <tr className="bg-gray-100 border-b" key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {product.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
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
                            ? `${product.moTa.substring(0, 20)}...`
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
                          className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ${product.status === true
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
                            onClick={() => updateProduct(product._id)}
                            type="button"
                            className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                          >
                            Edit
                          </button>

                          {/* Nút Active/Deactive */}
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() =>
                              toggleProductStatus(product._id, product.status)
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              type="button"
                              className={`focus:outline-none text-white ${product.status === true
                                  ? "bg-red-700 hover:bg-red-800"
                                  : "bg-green-700 hover:bg-green-800"
                                } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                            >
                              {product.status === true ? "Deactive" : "Active"}
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
