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
  const [filterMaterial, setFilterMaterial] = useState<string>("");
  const [filterPrice, setFilterPrice] = useState<[number, number]>([
    0, 100000000,
  ]);

  const [filterName, setFilterName] = useState<string>("");
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

  const handlePageChange = (currentPage: number) => {
    setPage((prev: any) => {
      return { ...prev, currentPage: currentPage };
    });
    fetchData(currentPage || 0);
  };

  const toggleProductStatus = async (id: string, status: boolean) => {
    try {
      if (status) {
        await DeactivateProduct(id);
      } else {
        await ActivateProduct(id);
      }

      const updatedProducts = products.map((product) =>
        product._id === id
          ? {
              ...product,
              status: !status,
            }
          : product
      );

      setProduct(updatedProducts);
    } catch (error) {
      console.error("Error toggling product status:", error);
    }
  };

  const filterByPrice = (
    products: Iproduct[],
    minPrice: number,
    maxPrice: number
  ): Iproduct[] => {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  };

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

    filtered = filterByPrice(filtered, filterPrice[0], filterPrice[1]);

    filtered = filterByMaterial(filtered, filterMaterial);

    filtered = filterByCategory(filtered, selectedCategory);
    filtered = filterByName(filtered, filterName);
    return filtered;
  };

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
        <button className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Thêm mới
        </button>
      </NavLink>

      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          <option value="">Danh mục</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filterMaterial}
          onChange={(e) => setFilterMaterial(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          <option value="">Chất liệu</option>
          {Array.from(new Set(products.map((p) => p.material?.name))).map(
            (material) => (
              <option key={material} value={material}>
                {material}
              </option>
            )
          )}
        </select>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="number"
            placeholder="Min Price"
            value={filterPrice[0]}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value));
              setFilterPrice([value, filterPrice[1]]);
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || isNaN(Number(e.key))) e.preventDefault();
            }}
            className="p-2 border border-gray-300 rounded w-full sm:w-[120px]"
          />
          <div className="mt-[5px]">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <input
            type="number"
            placeholder="Max Price"
            value={filterPrice[1]}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value));
              setFilterPrice([filterPrice[0], value]);
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || isNaN(Number(e.key))) e.preventDefault();
            }}
            className="p-2 border border-gray-300 rounded w-full sm:w-[120px]"
          />
        </div>
        <div className="relative w-full">
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
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Stt
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Tên Sản Phẩm
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Giá
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Danh mục
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Chất Liệu
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Số lượng
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Mô tả
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Ảnh
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Trạng Thái
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredProducts().map(
                    (product: Iproduct, index: number) => (
                      <tr className="bg-gray-100 border-b" key={product._id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900">
                          {product?.category?.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 truncate max-w-xs">
                          {product?.material?.name}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900">
                          {product.soLuong}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900 truncate">
                          {product.moTa.length > 50
                            ? `${product.moTa.substring(0, 20)}...`
                            : product.moTa}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900">
                          <img
                            className="w-[100px]"
                            src={product?.img[0]}
                            alt=""
                          />
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-light text-gray-900 ${
                            product.status ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {product.status ? "Hoạt động" : "Vô hiệu hóa"}
                        </td>
                        <td className="px-6 py-4 text-sm font-light text-gray-900">
                          <button
                            onClick={() => updateProduct(product._id)}
                            className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                          >
                            Edit
                          </button>
                          <Popconfirm
                            title="Are you sure?"
                            onConfirm={() =>
                              toggleProductStatus(product._id, product.status)
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              className={`focus:outline-none text-white ${
                                product.status
                                  ? "bg-red-700 hover:bg-red-800"
                                  : "bg-green-700 hover:bg-green-800"
                              } focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}
                            >
                              {product.status ? "Deactive" : "Active"}
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
