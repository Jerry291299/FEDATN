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
  const { categoryName } = useParams(); // Get category name from the URL
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
        category: selectedCategory || undefined,
      });
      const categoryData = await getAllCategories();
      setProducts(data?.docs);
      setPageConfig(data);
      setCategories(categoryData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryName) {
      const categoryId =
        categories.find((category) => category.name === categoryName)?._id ||
        null;
      setSelectedCategory(categoryId);
    }
    fetchData(page.currentPage); // Fetch products when category changes
  }, [categoryName, page.currentPage]); // Add categoryName to dependency array
  const handlePageChange = (currentPage: number) => {
    setPage({ ...page, currentPage });
  };

  const handleCategoryFilter = (categoryName: string | null) => {
    const selectedCategoryId =
      categories.find((category) => category.name === categoryName)?._id ||
      null;
    setSelectedCategory(selectedCategoryId);
    setPage({ ...page, currentPage: 1 });

    // Navigate to the new category route
    // history.push(`/categories/${categoryName}`);
  };
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <>
      {loading && <LoadingComponent />}
      <Header />

      <div className="container mx-auto py-10 px-4 flex gap-6">
        {/* Sidebar */}

        <aside className="w-1/4 bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-4rem)] overflow-hidden">
          <h2 className="text-lg font-bold mb-4">Danh mục</h2>
          <ul className="space-y-2 overflow-y-auto h-full">
            {/* All Products Option */}
            <li>
              <NavLink
                to="/products"
                onClick={() => handleCategoryFilter(null)} // Khi chọn "All Products", không lọc theo danh mục
                className={`block px-3 py-2 rounded-md transition-all ${
                  selectedCategory === null
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                All Products
              </NavLink>
            </li>

            {/* Other Categories */}
            {categories.length === 0 ? (
              <li className="text-gray-500">Sản phẩm chưa được cập nhật</li> // Thông báo nếu không có danh mục
            ) : (
              categories.map((category) => (
                <li key={category._id}>
                  <NavLink
                    to={`/products/categories/${category.name}`}
                    onClick={() => handleCategoryFilter(category.name)}
                    className={`block px-3 py-2 rounded-md transition-all ${
                      selectedCategory === category._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {category.name}
                  </NavLink>
                </li>
              ))
            )}
          </ul>
        </aside>

        {/* Product List */}
        <section className="w-3/4">
          <h1 className="text-2xl font-bold mb-6">Our Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(
                (product) =>
                  (selectedCategory === null ||
                    product.category._id === selectedCategory) &&
                  product.status
              )
              .map((product) => (
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

          {/* Pagination */}
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
