import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const cartCount = cartItems?.length || 0;

  // 🔐 Protected Navigation
  const handleProtectedRoute = (path) => {
    setOpen(false);

    if (!user) {
      navigate("/login");
      return;
    }

    navigate(path);
  };

  // 🚪 Logout
  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md text-white shadow-lg border-b border-gray-800">
      
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">

        {/* LOGO */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold tracking-wide hover:text-indigo-400 transition"
        >
          🛍 AwaisJota Store
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm">

          <Link className="hover:text-indigo-400 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-indigo-400 transition" to="/products">
            Products
          </Link>

          {/* Orders */}
          <button
            onClick={() => handleProtectedRoute("/orders")}
            className="hover:text-indigo-400 transition"
          >
            My Orders
          </button>

          {/* Cart */}
          <button
            onClick={() => handleProtectedRoute("/cart")}
            className="relative flex items-center gap-2 hover:text-indigo-400 transition"
          >
            <FiShoppingCart size={18} />
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 bg-red-500 text-[11px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* USER */}
          {user ? (
            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full max-w-[140px]">
                <FiUser className="shrink-0" />
                <span className="text-sm truncate">
                  {user.name?.split(" ")[0]}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-5 bg-gray-900 border-t border-gray-800">

          <Link onClick={() => setOpen(false)} to="/">
            Home
          </Link>

          <Link onClick={() => setOpen(false)} to="/products">
            Products
          </Link>

          <button
            onClick={() => handleProtectedRoute("/orders")}
            className="text-left hover:text-indigo-400"
          >
            My Orders
          </button>

          <button
            onClick={() => handleProtectedRoute("/cart")}
            className="flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <FiShoppingCart />
              Cart
            </span>

            <span className="bg-red-500 px-2 py-0.5 text-xs rounded-full">
              {cartCount}
            </span>
          </button>

          {/* USER MOBILE */}
          {user ? (
            <>
              <div className="text-gray-400 text-sm">
                Hi, {user.name}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-2 rounded-lg text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="bg-indigo-600 px-3 py-2 rounded-lg text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;