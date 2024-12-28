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
  const [products, setProducts] = useState<Iproduct[]>([]); // Dữ liệu tất cả sản phẩm
  const [categories, setCategories] = useState<Icategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<string>(""); // Lọc theo chất liệu
  const [sortOption, setSortOption] = useState<string>(""); // Tùy chọn sắp xếp
  const { categoryName } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageConfig, setPageConfig] = useState<any>();
  const [page, setPage] = useState({ limit: 6, currentPage: 1 });

  // Hàm lấy sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {
        admin: "true",
      };

      if (selectedCategory) {
        params.category = selectedCategory;
      }
      if (filterMaterial) {
        params.material = filterMaterial; // Thêm điều kiện lọc theo chất liệu
      }
      if (sortOption) {
        params.sort = sortOption; // Thêm điều kiện sắp xếp
      }

      const data = await getAllproducts(params);
      setProducts(data?.docs || []); // Lưu tất cả sản phẩm
      setPageConfig(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy danh mục
  const fetchCategories = async () => {
    try {
      const categoryData = await getAllCategories();
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Lấy danh mục khi component được mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Lấy sản phẩm khi danh mục hoặc lọc thay đổi
  useEffect(() => {
    fetchProducts(); // Lấy lại tất cả sản phẩm khi thay đổi lọc
  }, [selectedCategory, filterMaterial, sortOption]);

  // Lọc sản phẩm theo các điều kiện
  const filterProduct = products.filter((product) => {
    const categoryMatch =
      !selectedCategory || product.category?._id === selectedCategory;
    const materialMatch =
      !filterMaterial || product.material?.name === filterMaterial;

    return categoryMatch && materialMatch && product.status;
  });

  // Sắp xếp sản phẩm theo tùy chọn đã chọn
  const sortedProducts = [...filterProduct].sort((a, b) => {
    if (sortOption === "") {
      return 0; // Không sắp xếp, giữ nguyên thứ tự ban đầu
    } else if (sortOption === "asc") {
      return a.price - b.price; // Giá: Từ thấp đến cao
    } else if (sortOption === "desc") {
      return b.price - a.price; // Giá: Từ cao xuống thấp
    } else {
      // Mới nhất trước
      return (
        new Date(b.updatedAt || 0).getTime() -
        new Date(a.updatedAt || 0).getTime()
      );
    }
  });

  // Hàm xử lý thay đổi trang
  const handlePageChange = (currentPage: number) => {
    setPage((prev) => ({ ...prev, currentPage }));
  };

  // Hàm cắt ngắn văn bản
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <Header />
      <div className="container mx-auto py-10 px-4 flex">
        <div className="w-1/4 pr-4 flex flex-col text-left">
          <label className="text-2xl font-bold mb-6">Lọc sản phẩm:</label>

          <label className="text-xl font-bold mb-4">Lọc theo danh mục:</label>
          <select
            value={selectedCategory ? categories.find((category) => category._id === selectedCategory)?.name : ""}
            onChange={(e) => {
              const selectedCategoryName = e.target.value; // Giá trị mới từ select
              const selectedCategoryId =
                categories.find((category) => category.name === selectedCategoryName)?._id || null;
              setSelectedCategory(selectedCategoryId); // Cập nhật selectedCategory bằng _id
              setPage({ limit: page.limit, currentPage: 1 }); // Reset về trang 1 khi thay đổi
            }}
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

          <label className="text-xl font-bold mb-4">Lọc theo chất liệu:</label>
          <select
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

          <label className="text-xl font-bold mb-4">Lọc theo giá:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mb-6"
          >
            <option value="">Tất cả giá</option>
            <option value="asc">Giá từ thấp đến cao</option>
            <option value="desc">Giá từ cao xuống thấp</option>
            <option value="newest">Giá mới nhất</option>
          </select>
        </div>

        <section className="w-3/4">
          <h1 className="text-2xl font-bold mb-6">Sản phẩm của chúng tôi</h1>

          {sortedProducts.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Không tìm thấy sản phẩm phù hợp</h2>
              <p className="text-gray-500 mb-6">
                Hãy thử thay đổi tùy chọn lọc hoặc kiểm tra danh mục khác.
              </p>
              <h3 className="text-lg font-bold">Một số sản phẩm khác bạn có thể thích:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {products.slice(0, 6).map((product) => (
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
                      <h2 className="text-lg font-bold mb-2 text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 mb-1">
                        {product.category.name}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {truncateText(product.moTa, 50)}
                      </p>
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
                          Xem chi tiết
                        </button>
                      </div>
                    </NavLink>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
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
                        Xem chi tiết
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
              pageSize={page.limit}
              total={sortedProducts.length}
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
