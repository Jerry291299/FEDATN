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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
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
                categories.find((category) => category.name === categoryName)
                    ?._id || null;
            setSelectedCategory(categoryId);
        }
        fetchData(page.currentPage); // Fetch products when category changes
    }, [categoryName, page.currentPage]); // Add categoryName to dependency array
    const handlePageChange = (currentPage: number) => {
        setPage({ ...page, currentPage });
    };

    const handleCategoryFilter = (categoryName: string | null) => {
        const selectedCategoryId =
            categories.find((category) => category.name === categoryName)
                ?._id || null;
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

            <section className="py-10 bg-gray-100">
    <h1 className="text-center text-4xl font-bold mb-6">Our Products</h1>

    {/* Danh Mục Lọc */}
    <div className="flex justify-center flex-wrap gap-4 mb-6">
        {categories.map((category) => (
            <NavLink
                key={category._id}
                to={`/products/categories/${category.name}`}
                onClick={() => handleCategoryFilter(category.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                    selectedCategory === category._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
                {category.name}
            </NavLink>
        ))}
    </div>

    {/* Danh Sách Sản Phẩm */}
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {products
            ?.filter(
                (product) =>
                    (selectedCategory === null ||
                        product.category._id === selectedCategory) &&
                    product.status
            )
            .map((product: Iproduct) => (
                <article
                    key={`${product._id}_${product.category._id}`}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col"
                >
                    
                        <img
                            src={product.img[0]}
                            alt={product.name}
                            className="h-56 w-full object-cover rounded-t-lg"
                        />
                        <div className="p-4 flex-grow flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-serif mb-2 text-gray-800">
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
                        <NavLink to={`/product/${product._id}`} >
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
            className="pagination"
        />
    </div>
</section>


            <Footer />
        </>
    );
};

export default Productspage;
