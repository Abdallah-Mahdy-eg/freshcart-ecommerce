// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import LoadingScreen from "../LoadingScreen/LoadingScreen";
// import { Link } from "react-router-dom";
// import { CarouselDefault } from "../Slider/Slider";
// import { cartContext } from "../../Context/CartContext";

// const SuccessMessage = ({ show }) => (
//   <div
//     style={{ display: show ? "flex" : "none" }}
//     className="flex justify-center fixed left-1/2 transform -translate-x-1/2 top-10 z-50 my-3 bg-green-500 px-3 py-3 text-white rounded-lg shadow-lg gap-2"
//   >
//     <span className="font-medium">Product Added Successfully...</span>
//     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//     </svg>
//   </div>
// );

// const ProductCard = ({ product, onAdd, onRemove, isAdded }) => (
//   <div className="md:w-1/5 p-4">
//     <div className="bg-white border border-gray-100 rounded-xl overflow-hidden relative shadow-sm">

//       <div className="absolute top-2 right-2 z-10 bg-indigo-700 text-indigo-50 text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1">
//         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//         </svg>
//         {product.ratingsAverage}
//       </div>

//       <Link to={`/productDetails/${product.id}`}>
//         <img
//           src={product.imageCover}
//           className="w-full h-44 object-cover"
//           alt={product.title}
//         />
//         <div className="p-3">
//           <p className="text-xs text-gray-400 mb-1">{product.category.name}</p>
//           <p className="text-sm font-medium text-gray-800 mb-2 leading-snug">
//             {product.title.slice(0, product.title.indexOf(" ", 20))}
//           </p>
//           <div className="flex items-center gap-2 mb-3">
//             <span className="text-base font-medium text-indigo-700">
//               {product.priceAfterDiscount ?? product.price} EGP
//             </span>
//             {product.priceAfterDiscount && (
//               <span className="text-xs text-gray-400 line-through">
//                 {product.price} EGP
//               </span>
//             )}
//           </div>
//         </div>
//       </Link>

//       <div className="px-3 pb-3">
//         {isAdded ? (
//           <button
//             onClick={() => onRemove(product.id)}
//             className="w-full bg-transparent text-red-700 border border-red-700 rounded-lg py-2 text-sm font-medium hover:bg-red-50 transition-colors"
//           >
//             − Remove
//           </button>
//         ) : (
//           <button
//             onClick={() => onAdd(product.id)}
//             className="w-full bg-indigo-700 text-indigo-50 rounded-lg py-2 text-sm font-medium hover:bg-indigo-800 transition-colors"
//           >
//             + Add to cart
//           </button>
//         )}
//       </div>

//     </div>
//   </div>
// );

// const Home = () => {
//   const [allProducts, setAllProducts] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [addedProducts, setAddedProducts] = useState([]);

//   const { addProductToCart, removeProductFromCart } = useContext(cartContext);

//   async function getAllProducts() {
//     try {
//       let { data } = await axios.get(
//         "https://ecommerce.routemisr.com/api/v1/products",
//         { params: { sort: "category,price" } }
//       );
//       setAllProducts(data.data);
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   }

//   async function addMyProduct(id) {
//     if (await addProductToCart(id)) {
//       setShowSuccess(true);
//       setAddedProducts((prev) => [...prev, id]);
//       setTimeout(() => setShowSuccess(false), 2500);
//     }
//   }

//   async function removeMyProduct(id) {
//     if (await removeProductFromCart(id)) {
//       setAddedProducts((prev) => prev.filter((productId) => productId !== id));
//     }
//   }

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <>
//       <SuccessMessage show={showSuccess} />
//       <div className="min-h-screen bg-gray-100">
//         <div className="md:flex flex-wrap justify-center items-start py-5">
//           {allProducts ? (
//             <>
//               <CarouselDefault />
//               {allProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onAdd={addMyProduct}
//                   onRemove={removeMyProduct}
//                   isAdded={addedProducts.includes(product.id)}
//                 />
//               ))}
//             </>
//           ) : (
//             <LoadingScreen />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;


import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { CarouselDefault } from "../Slider/Slider";
import { cartContext } from "../../Context/CartContext";

const SuccessMessage = ({ show }) => (
  <div
    style={{ display: show ? "flex" : "none" }}
    className="flex justify-center fixed left-1/2 transform -translate-x-1/2 top-10 z-50 my-3 bg-green-500 px-3 py-3 text-white rounded-lg shadow-lg gap-2"
  >
    <span className="font-medium">Product Added Successfully...</span>
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const ProductCard = ({ product, onAdd, onRemove, isAdded }) => (
  <div className="md:w-1/5 p-4">
    <div
      className="bg-white rounded-xl overflow-hidden relative"
      style={{ boxShadow: "0 8px 24px rgba(67,56,202,0.15)" }}
    >
      <div className="absolute top-2 right-2 z-10 bg-indigo-700 text-indigo-50 text-xs font-medium px-2 py-1 rounded-lg flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        {product.ratingsAverage}
      </div>

      <Link to={`/productDetails/${product.id}`}>
        <img
          src={product.imageCover}
          className="w-full h-44 object-cover"
          alt={product.title}
        />
        <div className="p-3">
          <p className="text-xs text-gray-400 mb-1">{product.category.name}</p>
          <p className="text-sm font-medium text-gray-800 mb-2 leading-snug">
            {product.title.slice(0, product.title.indexOf(" ", 20))}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base font-medium text-indigo-700">
              {product.priceAfterDiscount ?? product.price} EGP
            </span>
            {product.priceAfterDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {product.price} EGP
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-3 pb-3">
        {isAdded ? (
          <button
            onClick={() => onRemove(product.id)}
            className="w-full bg-transparent text-red-700 border border-red-700 rounded-lg py-2 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            − Remove
          </button>
        ) : (
          <button
            onClick={() => onAdd(product.id)}
            className="w-full bg-indigo-700 text-indigo-50 rounded-lg py-2 text-sm font-medium hover:bg-indigo-800 transition-colors"
          >
            + Add to cart
          </button>
        )}
      </div>
    </div>
  </div>
);

const Home = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);

  const { addProductToCart, removeCartItem } = useContext(cartContext);

  async function getAllProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        { params: { sort: "category,price" } }
      );
      setAllProducts(data.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function addMyProduct(id) {
    if (await addProductToCart(id)) {
      setShowSuccess(true);
      setAddedProducts((prev) => [...prev, id]);
      setTimeout(() => setShowSuccess(false), 2500);
    }
  }

  async function removeMyProduct(id) {
    if (await removeCartItem(id)) {
      setAddedProducts((prev) => prev.filter((productId) => productId !== id));
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <SuccessMessage show={showSuccess} />
      <div className="md:flex flex-wrap justify-center items-start py-5">
        {allProducts ? (
          <>
            <CarouselDefault />
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addMyProduct}
                onRemove={removeMyProduct}
                isAdded={addedProducts.includes(product.id)}
              />
            ))}
          </>
        ) : (
          <LoadingScreen />
        )}
      </div>
    </>
  );
};

export default Home;