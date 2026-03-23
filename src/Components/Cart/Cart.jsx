import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

function Cart() {
  const { cartProducts, totalCartPrice, removeCartItem, updateCount } = useContext(cartContext);

  return (
    <>
      {cartProducts ? (
        cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96 gap-4">
            <svg className="w-24 h-24 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 7M17 13l1.4 7M9 20a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
            <p className="text-lg font-medium text-gray-400">Your cart is empty</p>
            <Link to="/home">
              <button className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 font-medium px-6 py-2 rounded-lg text-sm transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Your Cart</h2>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">
                  Total:{" "}
                  <span className="text-lg font-medium text-indigo-700">
                    {totalCartPrice} EGP
                  </span>
                </p>
                <Link to="/payment">
                  <button className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 font-medium px-5 py-2 rounded-lg transition-colors">
                    Confirm order
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {cartProducts.map((pro) => (
                <div
                  key={pro.product._id}
                  className="bg-white rounded-xl px-4 py-3 flex items-center gap-4"
                  style={{
                    border: "1.5px solid #c7d2fe",
                    boxShadow: "0 4px 16px rgba(67,56,202,0.15)",
                  }}
                >
                  <img
                    src={pro.product.imageCover}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt={pro.product.title}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {pro.product.title.slice(0, pro.product.title.indexOf(" ", 20))}
                    </p>
                    <p className="text-sm font-medium text-indigo-700">{pro.price} EGP</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCount(pro.product._id, pro.count - 1)}
                      disabled={pro.count === 1}
                      className="w-8 h-8 rounded-full bg-indigo-700 text-white text-lg flex items-center justify-center hover:bg-indigo-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{pro.count}</span>
                    <button
                      onClick={() => updateCount(pro.product._id, pro.count + 1)}
                      className="w-8 h-8 rounded-full bg-indigo-700 text-white text-lg flex items-center justify-center hover:bg-indigo-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeCartItem(pro.product._id)}
                    className="bg-transparent text-red-700 border border-red-700 rounded-lg py-1.5 px-3 text-sm hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Cart;