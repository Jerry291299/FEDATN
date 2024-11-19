import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Iproduct } from "../interface/products";
import { Icategory } from "../interface/category";
import { getAllproducts } from "../service/products";
import { getAllCategories } from "../service/category";
import { NavLink } from "react-router-dom";
import LoadingComponent from "./Loading";
import { Pagination } from "antd";

type Props = {};

const Productspage = (props: Props) => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [category, setCategory] = useState<Icategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageConfig, setPageConfig] = useState<any>()
  const [page, setPage] = useState<any>({
    limit: 5,
    currentPage: 1,
  })
  


  const fetchData = async (currentPage : number) => {
    try {
      setLoading(true);
      const data = await getAllproducts({limit: page.limit, page:currentPage});
      const danhmuc = await getAllCategories();
      setProducts(data?.docs);
      setPageConfig(data)
      console.log(data?.docs, "data");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchData(1);
  }, []);

  const handlePageChange = (currentPage: number) => {
    setPage((prev : any)   => {
      return {...prev, currentPage: currentPage}
    });
    fetchData(currentPage || 0)
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <Header />

      <section className="py-10 bg-gray-100">
        <h1 className="text-center text-4xl font-bold mb-6">Our Products</h1>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products?.map((product: Iproduct) => (
            <article
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-all"
            >
              <NavLink to={`/product/${product._id}`}>
                <img
                  src={product.img[0]}
                  alt={product.name}
                  className="h-56 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-serif mb-2">{product.name}</h2>
                  <p className="text-md text-gray-400">{product?.category?.name}</p>
                  <p className="text-sm text-gray-500">{product?.moTa}</p>
                  <p className="text-xl font-bold text-red-600">
                    ${product.price}
                  </p>
                </div>
                <div className="p-4">
                  <button className="w-full py-2 text-center bg-gray-100 rounded-lg hover:bg-gray-200">
                    View Details
                </button>
                </div>
              </NavLink>
            </article>
          ))}
        </div>
        <Pagination align="center" onChange={handlePageChange} pageSize= {pageConfig?.limit}  total={pageConfig?.totalDocs || 0} current={page.currentPage}/>

      </section>

      <Footer />
    </>
  );
};

export default Productspage;
