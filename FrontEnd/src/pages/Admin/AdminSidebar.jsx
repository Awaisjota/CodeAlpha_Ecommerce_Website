import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
} from "react-icons/fi";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-yellow-400 text-black font-semibold"
        : "text-white hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 min-h-screen bg-black text-white p-5 sticky top-0">

      {/* LOGO / TITLE */}
      <h2 className="text-xl font-bold mb-8 text-yellow-400">
        Admin Panel
      </h2>

      {/* NAV */}
      <nav className="flex flex-col gap-2">

        <NavLink to="/admin" end className={linkClass}>
          <FiHome size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <FiBox size={18} />
          Manage Products
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <FiShoppingCart size={18} />
          Manage Orders
        </NavLink>

      </nav>

    </div>
  );
};

export default AdminSidebar;