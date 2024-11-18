import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Iproduct } from "../interface/products";
import { Icategory } from "../interface/category";
import { getAllproducts } from "../service/products";
import { getAllCategories } from "../service/category";
import { NavLink } from "react-router-dom";
import LoadingComponent from "./Loading";

type Props = {};

const Productspage = (props: Props) => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [category, setCategory] = useState<Icategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sanpham = await getAllproducts({ limit: 10, page: 1 });
        const danhmuc = await getAllCategories();
        setProducts(sanpham.docs || []);
        setCategory(danhmuc);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
                  src={product.img}
                  alt={product.name}
                  className="h-56 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-serif mb-2">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.moTa}</p>
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
      </section>

      <Footer />
    </>
  );
};

export default Productspage;
