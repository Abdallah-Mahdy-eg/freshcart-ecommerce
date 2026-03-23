import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

import $ from 'jquery'

const ProductDetails = () => {
  
  const { addProductToCart , removeCartItem} = useContext(cartContext);

  const [productDetails, setProductDetails] = useState("");
  
  const { id } = useParams();

  async function addMyProduct(id){
    if(await addProductToCart(id)){
      $('.successMessage').fadeIn(1000,function(){
        setTimeout(() => {
          $('.successMessage').fadeOut(1000);
        }, 2000);
      })

      $('#delBtn').fadeIn(500);
      $('#addBtn').fadeOut(500);
    }
  }

  async function removeMyProduct(id) {

    if(await removeCartItem(id)){
      $('.removeMessage').fadeIn(500,function(){
        setTimeout(() => {
          $('.removeMessage').fadeOut(500);
        }, 2000);
      })

      $('#addBtn').fadeIn(500);
      $('#delBtn').fadeOut(500);
    }
    
  }

  async function getProductDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      {productDetails ? (
        <div className="md:flex justify-between gap-36 py-5">
          <div className="image md:w-1/3">
            <img className="w-full" src={productDetails.imageCover} alt="" />
          </div>
          <div className="description md:w-2/3 pt-8 md:p-0">
            <h2 className="font-bold text-xl">{productDetails.title}</h2>
            <h5 className="text-lg py-3">{productDetails.description}</h5>
            <h5 className="text-lg">Quantity: {productDetails.quantity}</h5>
            <h5 className="text-lg py-3">Price: {productDetails.price}</h5>
    
            <button id="addBtn"
              onClick={function(){addMyProduct(productDetails.id)}}
              className="w-full bg-green-600 rounded-lg text-white py-2"
            >
              Add Product to Cart +{" "}
            </button>

            <button onClick={()=>{removeMyProduct(productDetails.id)}} id="delBtn" style={{"display":"none"}} className="w-full bg-red-900 rounded-lg text-white py-2 my-3">
              Remove from Cart -{" "}
            </button>

            <div style={{"display":"none"}} className="successMessage flex justify-center alert my-2 bg-green-500 px-3 py-3 text-white rounded-lg shadow-lg">
              <span className="font-medium">Product Added Successfully...</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <div style={{"display":"none"}} className="removeMessage flex justify-center alert my-2 bg-green-500 px-3 py-3 text-white rounded-lg shadow-lg">
              <span className="font-medium">Product Removed Successfully...</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>


            {/* {showAlert&&(
                <div className="flex justify-center alert my-3 bg-green-500 px-3 py-3 text-white rounded-lg shadow-lg">
              <span className="font-medium">Product Added Successfully...</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            )} */}

            
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};
{
  /* <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-300 z-50">
        <div className="flex items-center gap-3">
            <span className="font-medium">Product Added Successfully...</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>
        
        </div> */
}
export default ProductDetails;
