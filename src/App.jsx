import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import errorImg from "./assets/error.svg";
import Brands from "./Components/Brands/Brands";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Profile from "./Components/Profial/Profile";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Context/CartContext";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const getUserData = () => {
    let userData = jwtDecode(localStorage.getItem("tok"));
    setCurrentUser(userData);
  };

  const clearUserData = () => {
    localStorage.removeItem("tok");
    setCurrentUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem("tok") != null && currentUser === null) {
      getUserData();
    }
  }, []);

  // ProtectedRoute
  function ProtectedRoute({ children }) {
    if (currentUser === null) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <CartContextProvider>
          <Layout currentUser={currentUser} clearUserData={clearUserData} />
        </CartContextProvider>
      ),
      children: [
        { index: true, element: currentUser ? <Home /> : <Navigate to="/login" /> },
        { path: "home", element: currentUser ? <Home /> : <Navigate to="/login" /> },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "brands", element: <Brands /> },
        {
          path: "allOrders",
          element: (
            <ProtectedRoute>
              <AllOrders crrUser={currentUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: "payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        { path: "brandProducts/:id", element: <BrandProducts /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: currentUser ? <Navigate to="/home" /> : <Login getUserData={getUserData} />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile currentUser={currentUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: currentUser ? <Navigate to="/home" /> : <Register />,
        },
        {
          path: "*",
          element: (
            <div className="h-dvh flex flex-col items-center justify-center gap-4 text-center">
              <img src={errorImg} className="w-80" alt="Not Found" />
              <h2 className="text-2xl font-bold">Page Not Found</h2>
            </div>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;