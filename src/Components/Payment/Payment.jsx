import axios from "axios";
import { useContext, useRef, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const nav = useNavigate();
  const { cartId } = useContext(cartContext);
  const [isCashLoading, setIsCashLoading] = useState(false);
  const [isCreditLoading, setIsCreditLoading] = useState(false);

  const detailsRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();

  function getShippingAddress() {
    return {
      shippingAddress: {
        details: detailsRef.current.value,
        phone: phoneRef.current.value,
        city: cityRef.current.value,
        postalCode: postalCodeRef.current.value,
      },
    };
  }

  async function confirmCashOrder() {
    try {
      setIsCashLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
        getShippingAddress(),
        { headers: { token: localStorage.getItem("tok") } }
      );
      if (data.status === "success") {
        nav("/allOrders");
      }
    } catch (error) {
      // handle error
    } finally {
      setIsCashLoading(false);
    }
  }

  async function confirmCreditOrder() {
    try {
      setIsCreditLoading(true);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        getShippingAddress(),
        {
          headers: { token: localStorage.getItem("tok") },
          params: { url: "http://localhost:5173" },
        }
      );
      if (data.status === "success") {
        window.open(data.session.url);
      }
    } catch (error) {
      // handle error
    } finally {
      setIsCreditLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-xl font-medium mb-6">Shipping Details</h2>

      <div
        className="bg-white rounded-2xl p-6"
        style={{
          border: "1.5px solid #c7d2fe",
          boxShadow: "0 4px 16px rgba(67,56,202,0.12)",
        }}
      >
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-500 block mb-1.5">
              Address Details
            </label>
            <input
              ref={detailsRef}
              type="text"
              placeholder="e.g. 12 El Tahrir St, Apt 3"
              className="w-full px-3 py-2 border border-indigo-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1.5">Phone</label>
            <input
              ref={phoneRef}
              type="text"
              placeholder="e.g. 01012345678"
              className="w-full px-3 py-2 border border-indigo-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm text-gray-500 block mb-1.5">City</label>
              <input
                ref={cityRef}
                type="text"
                placeholder="e.g. Cairo"
                className="w-full px-3 py-2 border border-indigo-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-500 block mb-1.5">
                Postal Code
              </label>
              <input
                ref={postalCodeRef}
                type="text"
                placeholder="e.g. 11511"
                className="w-full px-3 py-2 border border-indigo-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={confirmCashOrder}
            disabled={isCashLoading}
            className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-indigo-50 font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCashLoading ? "Loading..." : "Cash Payment"}
          </button>
          <button
            type="button"
            onClick={confirmCreditOrder}
            disabled={isCreditLoading}
            className="flex-1 bg-transparent text-indigo-700 border border-indigo-700 font-medium py-2.5 rounded-lg text-sm hover:bg-indigo-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isCreditLoading ? "Loading..." : "Credit Card"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;