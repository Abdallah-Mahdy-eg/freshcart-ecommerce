import axios from "axios";
import { createContext, useEffect, useState } from "react";
import $ from "jquery";  
import { useNavigate } from "react-router-dom";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const nav = useNavigate();
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState(null);
  // const [showAlert,setShowAlert ]=useState(false);
  const [cartId,setCartId] = useState(null);

  const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart";

  const getAuthHeaders = () => ({
    headers: { token: localStorage.getItem("tok") }
  });

  async function addProductToCart(proId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: proId },
        { headers: { token: localStorage.getItem("tok") } },
      );
      if (data.status === "success") {
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if(error.response.status==404){
        $('.errorCart').fadeIn(500,function(){
          setTimeout(() => {
            $('.errorCart').fadeOut(500);
            nav('/home');
          }, 2000);
        })
      }
      console.log("Error, ", error);
    }
  }

  async function removeCartItem(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers: { token: localStorage.getItem("tok") } },
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        return true;
      }
    } catch (error) {
      console.log("Error, ", error);
    }
  }

  async function getCartProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: localStorage.getItem("tok") } },
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartId(data.data._id)
      }
    } catch (error) {
      console.log("Error, ", error);
    }
  }

  async function updateCount(id, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          "count": count,
        },
        { headers: { token: localStorage.getItem("tok") } },
      );

      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
      }
    } catch (error) {
      console.log("Error, ", error);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        cartProducts,
        removeCartItem,
        updateCount,
        cartId
      }}
    >
      <div style={{'display':'none'}} className="errorCart">No Cart Exist</div>
      {children}
    </cartContext.Provider>
  );
}
