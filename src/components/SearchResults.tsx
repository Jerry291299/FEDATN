import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProductLite } from "../interface/products";
import { getAllproducts } from "../service/products";
import Header from "./Header";
import LoadingComponent from "./Loading";

const SearchResults = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [filteredProducts, setFilteredProducts] = useState<IProductLite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      setLoading(true);
      try {
        const products: IProductLite[] = await getAllproducts();
        const results = products
          .filter((product: IProductLite) =>
            product.name.toLowerCase().includes(searchTerm?.toLowerCase() || "")
          )
          .map((product: IProductLite) => ({
            _id: product._id,
            name: product.name,
            img: product.img,
            price: product.price,
            category: product.category,
          }));
        setFilteredProducts(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterProducts();
  }, [searchTerm]);

  return (
    <>
      {loading && <LoadingComponent />}
      <Header />
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{searchTerm}"
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="product-card bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
              >
                <img
                  src={product.img}
                  className="h-56 w-full object-cover"
                  alt=""
                />
                <div className="flex-auto px-6 py-5">
                  <span className="mb-2 flex items-center text-sm font-semibold">
                    <svg
                      viewBox="0 -196 1416 1416"
                      className="icon w-[30px]"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fafafa"
                      stroke="#fafafa"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M324.358919 22.140541H1361.643243c18.819459 0 33.210811 14.391351 33.210811 33.21081v645.396757c0 18.819459-14.391351 33.210811-33.210811 33.210811H324.358919c-18.819459 0-33.210811-14.391351-33.210811-33.210811V55.351351c0-18.819459 14.391351-33.210811 33.210811-33.21081z"
                          fill="#9DBE87"
                        ></path>
                        <path
                          d="M1361.643243 756.099459H324.358919c-30.996757 0-55.351351-24.354595-55.351351-55.351351V55.351351c0-30.996757 24.354595-55.351351 55.351351-55.351351H1361.643243c30.996757 0 55.351351 24.354595 55.351352 55.351351v645.396757c0 29.88973-24.354595 55.351351-55.351352 55.351351zM324.358919 44.281081c-6.642162 0-11.07027 4.428108-11.07027 11.07027v645.396757c0 6.642162 4.428108 11.07027 11.07027 11.07027H1361.643243c6.642162 0 11.07027-4.428108 11.070271-11.07027V55.351351c0-6.642162-4.428108-11.07027-11.070271-11.07027H324.358919z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M230.261622 116.237838h1038.391351c18.819459 0 33.210811 14.391351 33.210811 33.210811v645.396756c0 18.819459-14.391351 33.210811-33.210811 33.210811H230.261622c-18.819459 0-33.210811-14.391351-33.210811-33.210811V149.448649c0-18.819459 14.391351-33.210811 33.210811-33.210811z"
                          fill="#9DBE87"
                        ></path>
                        <path
                          d="M1267.545946 850.196757H230.261622c-30.996757 0-55.351351-24.354595-55.351352-55.351352V149.448649c0-30.996757 24.354595-55.351351 55.351352-55.351352h1038.391351c30.996757 0 55.351351 24.354595 55.351351 55.351352v645.396756c-1.107027 29.88973-25.461622 55.351351-56.458378 55.351352zM230.261622 138.378378c-6.642162 0-11.07027 4.428108-11.070271 11.070271v645.396756c0 6.642162 4.428108 11.07027 11.070271 11.070271h1038.391351c6.642162 0 11.07027-4.428108 11.07027-11.070271V149.448649c0-6.642162-4.428108-11.07027-11.07027-11.070271H230.261622z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M143.913514 208.121081h1038.391351c18.819459 0 33.210811 14.391351 33.210811 33.210811v645.396757c0 18.819459-14.391351 33.210811-33.210811 33.21081H143.913514c-18.819459 0-33.210811-14.391351-33.210811-33.21081V241.331892c0-17.712432 14.391351-33.210811 33.210811-33.210811z"
                          fill="#9DBE87"
                        ></path>
                        <path
                          d="M1182.304865 942.08H143.913514c-30.996757 0-55.351351-24.354595-55.351352-55.351351V241.331892c0-30.996757 24.354595-55.351351 55.351352-55.351351h1038.391351c30.996757 0 55.351351 24.354595 55.351351 55.351351v645.396757c0 29.88973-25.461622 55.351351-55.351351 55.351351zM143.913514 230.261622c-6.642162 0-11.07027 4.428108-11.070271 11.07027v645.396757c0 6.642162 4.428108 11.07027 11.070271 11.07027h1038.391351c6.642162 0 11.07027-4.428108 11.07027-11.07027V241.331892c0-6.642162-4.428108-11.07027-11.07027-11.07027H143.913514z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M55.351351 290.041081h1038.391352c18.819459 0 33.210811 14.391351 33.210811 33.210811v645.396757c0 18.819459-14.391351 33.210811-33.210811 33.21081H55.351351c-18.819459 0-33.210811-14.391351-33.21081-33.21081V323.251892c0-17.712432 14.391351-33.210811 33.21081-33.210811z"
                          fill="#9DBE87"
                        ></path>
                        <path
                          d="M1093.742703 1024H55.351351c-30.996757 0-55.351351-24.354595-55.351351-55.351351V323.251892c0-30.996757 24.354595-55.351351 55.351351-55.351351h1038.391352c30.996757 0 55.351351 24.354595 55.351351 55.351351v645.396757c0 30.996757-25.461622 55.351351-55.351351 55.351351zM55.351351 312.181622c-6.642162 0-11.07027 4.428108-11.07027 11.07027v645.396757c0 6.642162 4.428108 11.07027 11.07027 11.07027h1038.391352c6.642162 0 11.07027-4.428108 11.07027-11.07027V323.251892c0-6.642162-4.428108-11.07027-11.07027-11.07027H55.351351z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M954.257297 902.227027H194.836757c0-52.03027-43.174054-95.204324-95.204325-95.204324V472.700541c52.03027 0 95.204324-43.174054 95.204325-95.204325h759.42054c0 52.03027 43.174054 95.204324 95.204325 95.204325v334.322162c-53.137297 0-95.204324 43.174054-95.204325 95.204324z"
                          fill="#D6F0C5"
                        ></path>
                        <path
                          d="M954.257297 924.367568H194.836757c-12.177297 0-22.140541-9.963243-22.140541-22.140541 0-39.852973-33.210811-73.063784-73.063784-73.063784-12.177297 0-22.140541-9.963243-22.14054-22.14054V472.700541c0-12.177297 9.963243-22.140541 22.14054-22.140541 39.852973 0 73.063784-33.210811 73.063784-73.063784 0-12.177297 9.963243-22.140541 22.140541-22.14054h759.42054c12.177297 0 22.140541 9.963243 22.140541 22.14054 0 39.852973 33.210811 73.063784 73.063784 73.063784 12.177297 0 22.140541 9.963243 22.14054 22.140541v334.322162c0 12.177297-9.963243 22.140541-22.14054 22.14054-39.852973 0-73.063784 33.210811-73.063784 73.063784 0 12.177297-9.963243 22.140541-22.140541 22.140541z m-739.494054-44.281082h718.460541c8.856216-46.495135 46.495135-84.134054 92.99027-92.99027V492.627027c-46.495135-8.856216-84.134054-46.495135-92.99027-92.99027H214.763243c-8.856216 46.495135-46.495135 84.134054-92.99027 92.99027V785.989189c46.495135 9.963243 84.134054 47.602162 92.99027 94.097297z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M576.761081 790.417297c-35.424865 0-73.063784-13.284324-99.632432-47.602162-7.749189-9.963243-5.535135-23.247568 3.321081-30.996757 9.963243-7.749189 23.247568-5.535135 30.996756 3.321081 26.568649 34.317838 67.528649 35.424865 94.097298 26.568649 22.140541-7.749189 35.424865-22.140541 35.424865-37.638919 0-14.391351-34.317838-24.354595-64.207568-33.210811-46.495135-14.391351-105.167568-30.996757-105.167567-86.348108 0-26.568649 16.605405-50.923243 45.388108-65.314594 35.424865-17.712432 95.204324-24.354595 151.662702 16.605405 9.963243 7.749189 12.177297 21.033514 4.428108 30.996757-7.749189 9.963243-21.033514 12.177297-30.996756 4.428108-37.638919-27.675676-79.705946-26.568649-105.167568-13.284324-13.284324 6.642162-22.140541 16.605405-22.14054 26.568648 0 21.033514 30.996757 30.996757 73.063783 44.281081 45.388108 13.284324 95.204324 28.782703 95.204325 75.277838 0 34.317838-25.461622 65.314595-65.314595 79.705946-11.07027 3.321081-26.568649 6.642162-40.96 6.642162z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M574.547027 549.085405c-12.177297 0-22.140541-9.963243-22.140541-22.14054v-48.709189c0-12.177297 9.963243-22.140541 22.140541-22.140541s22.140541 9.963243 22.140541 22.140541v48.709189c0 13.284324-9.963243 22.140541-22.140541 22.14054z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M574.547027 832.484324c-12.177297 0-22.140541-9.963243-22.140541-22.14054v-36.531892c0-12.177297 9.963243-22.140541 22.140541-22.140541s22.140541 9.963243 22.140541 22.140541v36.531892c0 12.177297-9.963243 22.140541-22.140541 22.14054z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M285.612973 653.145946m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z"
                          fill="#AECD99"
                        ></path>
                        <path
                          d="M285.612973 715.139459c-34.317838 0-63.100541-27.675676-63.100541-63.10054s27.675676-63.100541 63.100541-63.100541c34.317838 0 63.100541 27.675676 63.100541 63.100541s-28.782703 63.100541-63.100541 63.10054z m0-80.812973c-9.963243 0-18.819459 7.749189-18.819459 18.81946s7.749189 18.819459 18.819459 18.819459c9.963243 0 18.819459-7.749189 18.819459-18.819459s-8.856216-18.819459-18.819459-18.81946z"
                          fill="#131313"
                        ></path>
                        <path
                          d="M865.695135 653.145946m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z"
                          fill="#AECD99"
                        ></path>
                        <path
                          d="M865.695135 715.139459c-34.317838 0-63.100541-27.675676-63.10054-63.10054s27.675676-63.100541 63.10054-63.100541c34.317838 0 63.100541 27.675676 63.100541 63.100541s-28.782703 63.100541-63.100541 63.10054z m0-80.812973c-9.963243 0-18.819459 7.749189-18.819459 18.81946s7.749189 18.819459 18.819459 18.819459 18.819459-7.749189 18.81946-18.819459-8.856216-18.819459-18.81946-18.81946z"
                          fill="#131313"
                        ></path>
                      </g>
                    </svg>
                    {product.price}
                  </span>
                  <h3 className="mt-4 mb-3 text-xl font-semibold xl:text-2xl">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-base font-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quam tempore officiis. Lorem, ipsum dolor.
                  </p>
                  <a
                    href={`/product/${product._id}`}
                    className="inline-block cursor-pointer select-none rounded-full border border-gray-800 bg-gray-800 px-2 py-1 text-center align-middle text-sm font-semibold leading-normal text-white no-underline shadow-sm"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found for "{searchTerm}".</p>
        )}
      </div>
    </>
  );
};
export default SearchResults;
