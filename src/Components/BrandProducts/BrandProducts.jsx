import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const BrandProducts = () => {
  const [allBrandProducts, setAllBrandProducts] = useState(null);
  const { id } = useParams();

  async function getBrandProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        { params: { brand: `${id}` } }
      );
      setAllBrandProducts(data.data);
    } catch (error) {
      console.log("Error,", error);
    }
  }

  useEffect(() => {
    getBrandProducts();
  }, []);

  return (
    <>
      <div className="md:flex flex-wrap justify-center items-start py-5">
        {allBrandProducts ? (
          allBrandProducts.length === 0 ? (
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-4xl text-gray-400">Oops! Nothing here</p>
            </div>
          ) : (
            allBrandProducts.map((brandProduct) => (
              <div key={brandProduct.id} className="md:w-1/5 p-4">
                <div
                  className="bg-white rounded-xl overflow-hidden relative"
                  style={{ boxShadow: "0 8px 24px rgba(67,56,202,0.15)" }}
                >
                  <div className="absolute top-2 right-2 z-10 bg-indigo-700 text-indigo-50 text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {brandProduct.ratingsAverage}
                  </div>

                  <Link to={`/productDetails/${brandProduct.id}`}>
                    <img
                      src={brandProduct.imageCover}
                      className="w-full h-44 object-cover"
                      alt={brandProduct.title}
                    />
                    <div className="p-3">
                      <p className="text-xs text-gray-400 mb-1">
                        {brandProduct.category.name}
                      </p>
                      <p className="text-sm font-medium text-gray-800 mb-2 leading-snug">
                        {brandProduct.title.slice(
                          0,
                          brandProduct.title.indexOf(" ", 20)
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium text-indigo-700">
                          {brandProduct.priceAfterDiscount ?? brandProduct.price} EGP
                        </span>
                        {brandProduct.priceAfterDiscount && (
                          <span className="text-xs text-gray-400 line-through">
                            {brandProduct.price} EGP
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
};

export default BrandProducts;