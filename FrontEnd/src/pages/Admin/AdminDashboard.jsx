import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../features/productSlice";
import { getAllOrders } from "../../features/orderSlice";

import Loader from "../../components/common/Loader";

import {
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
} from "react-icons/fi";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { products = [], isLoading: productsLoading, error: productsError } =
    useSelector((state) => state.product);

  const { orders = [], isLoading: ordersLoading, error: ordersError } =
    useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  // 🔄 LOADING STATE
  if (productsLoading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" className="text-gray-500" />
      </div>
    );
  }

  // 💰 REVENUE CALC
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <FiPackage size={22} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FiShoppingCart size={22} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Revenue",
      value: `Rs. ${totalRevenue}`,
      icon: <FiDollarSign size={22} />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {(productsError || ordersError) && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {productsError || ordersError}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your store performance
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 text-sm">
                  {stat.title}
                </h2>
                <p className="text-2xl font-bold mt-2 text-gray-800">
                  {stat.value}
                </p>
              </div>

              <div
                className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INSIGHTS */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold text-gray-700 mb-3">
            Recent Activity
          </h2>

          <ul className="text-sm text-gray-500 space-y-2">
            <li>
              🛒 Latest order: #
              {orders?.[0]?._id?.slice(-6) || "N/A"}
            </li>
            <li>
              📦 Products in store: {products.length}
            </li>
            <li>
              📊 Total orders: {orders.length}
            </li>
          </ul>
        </div>

        {/* REVENUE */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold text-gray-700 mb-3">
            Revenue Insight
          </h2>

          <p className="text-gray-500 text-sm">
            Total earnings from all orders.
          </p>

          <p className="text-3xl font-bold text-green-600 mt-4">
            Rs. {totalRevenue}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;