import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useState } from "react";

const Navbar = ({ currentUser, clearUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const logoutUser = () => {
    clearUserData();
    navigate("/login");
  };

  return (
    <nav
      className="px-6 h-16 flex justify-between items-center relative"
      style={{ background: "#1f2937" }}
    >
      <div className="flex gap-10 items-center">
        <Link to="home">
          <img src={logo} alt="freshCart logo" className="brightness-0 invert" />
        </Link>
        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="home" className="text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="brands" className="text-sm text-gray-300 hover:text-white transition-colors">
              Brands
            </Link>
          </li>
          {currentUser && (
            <>
              <li>
                <Link to="cart" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="allOrders" className="text-sm text-gray-300 hover:text-white transition-colors">
                  All Orders
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="right hidden md:block">
        <ul className="flex gap-6 items-center">
          {currentUser ? (
            <>
              <li>
                <Link to="profile" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutUser}
                  className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="login" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      <button
        onClick={handleMenuToggle}
        className="md:hidden px-2 py-1 border border-gray-600 rounded text-gray-300"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {isOpen && (
        <ul
          className="md:hidden flex flex-col z-50 w-screen absolute top-full left-0"
          style={{ background: "#1f2937", borderTop: "1px solid #374151" }}
        >
          <li onClick={handleCloseMenu} style={{ borderBottom: "1px solid #374151" }}>
            <Link to="home" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              Home
            </Link>
          </li>
          <li onClick={handleCloseMenu} style={{ borderBottom: "1px solid #374151" }}>
            <Link to="brands" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              Brands
            </Link>
          </li>
          {currentUser && (
            <>
              <li onClick={handleCloseMenu} style={{ borderBottom: "1px solid #374151" }}>
                <Link to="cart" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  Cart
                </Link>
              </li>
              <li onClick={handleCloseMenu} style={{ borderBottom: "1px solid #374151" }}>
                <Link to="allOrders" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  All Orders
                </Link>
              </li>
              <li onClick={handleCloseMenu} style={{ borderBottom: "1px solid #374151" }}>
                <Link to="profile" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  Profile
                </Link>
              </li>
              <li className="px-4 py-3">
                <button
                  onClick={() => { logoutUser(); handleCloseMenu(); }}
                  className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li onClick={handleCloseMenu} style={{ borderBottom: "1px solid #374151" }}>
                <Link to="login" className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  Login
                </Link>
              </li>
              <li className="px-4 py-3">
                <button
                  onClick={() => { navigate("/register"); handleCloseMenu(); }}
                  className="bg-indigo-700 hover:bg-indigo-800 text-indigo-50 text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;