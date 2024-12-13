import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Iproduct } from "../interface/products";
import { Icategory } from "../interface/category";
import { getAllproducts } from "../service/products";
import { getAllCategories } from "../service/category";
import LoadingComponent from "./Loading";
import { Pagination } from "antd";

type Props = {};

const Productspage = (props: Props) => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<string>(""); // Lọc theo chất liệu
  const [filterPrice, setFilterPrice] = useState<[number, number]>([
    0, 100000000,
  ]); // Giá min và max

  const { categoryName } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageConfig, setPageConfig] = useState<any>();
  const [page, setPage] = useState({ limit: 6, currentPage: 1 });

  const fetchProducts = async (currentPage: number) => {
    setLoading(true);
    try {
      const data = await getAllproducts({
        limit: page.limit,
        page: currentPage,
        category: selectedCategory || undefined,
        admin: "true",
      });
      setProducts(data?.docs || []);
      setPageConfig(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryData = await getAllCategories();
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryId =
      categories.find((category) => category.name === categoryName)?._id ||
      null;
    setSelectedCategory(categoryId);
    fetchProducts(page.currentPage);
  }, [categoryName, categories, page.currentPage]);

  const handlePageChange = (currentPage: number) => {
    setPage((prev) => ({ ...prev, currentPage }));
    fetchProducts(currentPage);
  };
  // Logic lọc sản phẩm theo danh m
  const handleCategoryFilter = (categoryName: string | null) => {
    const selectedCategoryId =
      categories.find((category) => category.name === categoryName)?._id ||
      null;

    setSelectedCategory(selectedCategoryId);
    setPage({ limit: page.limit, currentPage: 1 });
    fetchProducts(1);
  };
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  // Logic lọc sản phẩm
  const filterProduct = products.filter(
    (product) =>
      (selectedCategory === null ||
        product.category._id === selectedCategory) &&
      product.status &&
      (filterMaterial === "" || product.material?.name === filterMaterial) && // Lọc theo chất liệu
      product.price >= filterPrice[0] &&
      product.price <= filterPrice[1] // Lọc theo giá
  );

  return (
    <>
      {loading && <LoadingComponent />}
      <Header />
      {/* lọc sản phẩm theo danh mục  */}
      <div className="container mx-auto py-10 px-4 flex">
        <div className="w-1/4 pr-4 flex flex-col text-left">
          <label htmlFor="" className="text-2xl font-bold mb-6">
            Lọc sản phẩm:
          </label>

          <label htmlFor="category" className="text-xl font-bold mb-4">
            Lọc theo danh mục:
          </label>
          <select
            id="category"
            value={selectedCategory || ""}
            onChange={(e) =>
              handleCategoryFilter(
                e.target.value === "" ? null : e.target.value
              )
            }
            className="p-2 border border-gray-300 rounded w-full mb-6"
          >
            <option value="">Tất cả danh mục</option>
            {categories.length === 0 ? (
              <option disabled className="text-gray-500">
                Sản phẩm chưa được cập nhật
              </option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))
            )}
          </select>

          <label htmlFor="material" className="text-xl font-bold mb-4">
            Lọc theo chất liệu:
          </label>
          <select
            id="material"
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Tất cả chất liệu</option>
            {Array.from(new Set(products.map((p) => p.material?.name))).map(
              (material) =>
                material && (
                  <option key={material} value={material}>
                    {material}
                  </option>
                )
            )}
          </select>

          <label htmlFor="price" className="text-xl font-bold mb-4">
            Lọc theo giá:
          </label>
          <div className="flex gap-2 mb-6">
            <input
              type="number"
              placeholder="Giá tối thiểu"
              value={filterPrice[0]}
              onChange={(e) =>
                setFilterPrice([
                  Math.max(0, Number(e.target.value)),
                  filterPrice[1],
                ])
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="number"
              placeholder="Giá tối đa"
              value={filterPrice[1]}
              onChange={(e) =>
                setFilterPrice([
                  filterPrice[0],
                  Math.max(0, Number(e.target.value)),
                ])
              }
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>

        <section className="w-3/4">
          <h1 className="text-2xl font-bold mb-6">Sản phẩm của chúng tôi</h1>

          {filterProduct.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">
                Không tìm thấy sản phẩm
              </h2>
              <p className="text-gray-500">
                Xin lỗi, không có sản phẩm phù hợp với yêu cầu của bạn.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProduct.map((product) => (
                <article
                  key={product._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col"
                >
                  <img
                    src={product.img[0]}
                    alt={product.name}
                    className="h-56 w-full object-cover rounded-t-lg"
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold mb-2 text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 mb-1">
                        {product.category.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {truncateText(product.moTa, 50)}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-red-600 mt-auto">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </p>
                  </div>
                  <NavLink to={`/product/${product._id}`}>
                    <div className="p-4">
                      <button className="w-full py-2 text-center bg-gray-100 rounded-lg hover:bg-gray-200">
                        View Details
                      </button>
                    </div>
                  </NavLink>
                </article>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Pagination
              onChange={handlePageChange}
              pageSize={pageConfig?.limit}
              total={pageConfig?.totalDocs || 0}
              current={page.currentPage}
              showSizeChanger={false}
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Productspage;
