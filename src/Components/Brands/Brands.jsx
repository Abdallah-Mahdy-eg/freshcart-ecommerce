import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

const Brands = () => {
  const [allBrands, setAllBrands] = useState(null);

  async function getAllBrands() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands",
      );
      setAllBrands(data.data);
    } catch (error) {
      console.log("error, ", error);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      {allBrands ? (
        <div className="brands flex flex-wrap justify-center items-center">
          <div className="brand md:w-1/4 p-4 text-center md:text-start">
            <h2 className="text-indigo-500 font-bold text-2xl py-4">
              Our Brands
            </h2>
            <p className="md:text-sm text-lg">
              You can see our brands and each brand includes products in it.
            </p>
          </div>
          {allBrands.map(function (brand) {
            return (
              <div key={brand._id} className="brand md:w-1/4 py-4">
                <Link to={`/brandProducts/${brand._id}`}>
                  <div>
                    <img src={brand.image} alt={brand.name} />
                    <h5 className="text-center text-indigo-500 font-bold">
                      {brand.name}
                    </h5>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Brands;
