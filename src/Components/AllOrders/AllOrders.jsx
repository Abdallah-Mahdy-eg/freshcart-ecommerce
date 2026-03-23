import axios from "axios";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const AllOrders = ({ crrUser }) => {
  const [allOrders, setAllOrders] = useState(null);

  async function getAllOrders() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${crrUser.id}`
      );
      setAllOrders(data);
    } catch (error) {
      console.log("Error ,", error);
    }
  }

  useEffect(function () {
    getAllOrders();
  }, []);

  return (
    <>
      {allOrders ? (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h2 className="text-xl font-medium mb-6">My Orders</h2>

          <div className="flex flex-col gap-5">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  border: "1.5px solid #c7d2fe",
                  boxShadow: "0 4px 16px rgba(67,56,202,0.12)",
                }}
              >
                <div className="bg-indigo-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex gap-5">
                    <span className="text-sm font-medium text-indigo-700">
                      Total: {order.totalOrderPrice} EGP
                    </span>
                    <span className="text-sm text-gray-500">
                      Payment: {order.paymentMethodType}
                    </span>
                  </div>
                  <span className="text-xs bg-indigo-700 text-indigo-50 px-3 py-1 rounded-full">
                    Delivered
                  </span>
                </div>

                <div className="px-4 py-3">
                  <p className="text-xs text-gray-400 mb-3">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.details} —{" "}
                    {order.shippingAddress.phone}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-2 bg-gray-50 rounded-xl p-2"
                        style={{ width: "210px" }}
                      >
                        <img
                          src={item.product.imageCover}
                          className="w-12 h-12 object-cover rounded-lg"
                          alt={item.product.title}
                        />
                        <div>
                          <p className="text-xs font-medium text-gray-800 mb-0.5">
                            {item.product.title.slice(
                              0,
                              item.product.title.indexOf(" ", 20)
                            )}
                          </p>
                          <p className="text-xs text-gray-400">
                            x{item.count} — {item.price} EGP
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default AllOrders;