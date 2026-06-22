import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserOrders } from "../features/orderSlice";
import OrderCard from "../components/order/OrderCard";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userOrders = [], isLoading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Orders 📦
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Track, manage and view all your purchases in one place
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="
              px-5 py-2.5
              bg-black text-white
              rounded-lg
              font-medium
              hover:bg-gray-800
              transition-all duration-200
              active:scale-95
              shadow-sm hover:shadow-md
            "
          >
            Continue Shopping
          </button>

        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500 mt-4">Loading your orders...</p>
          </div>
        )}

        {/* ERROR */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-center mb-6">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !error && userOrders.length === 0 && (
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-14 text-center">

            <div className="text-7xl mb-4">🛒</div>

            <h2 className="text-2xl font-semibold text-gray-800">
              No Orders Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Looks like you haven’t placed any orders. Start shopping and your orders will appear here.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="
                mt-6 px-6 py-3
                bg-black text-white
                rounded-lg font-medium
                hover:bg-gray-800
                transition-all duration-200
                active:scale-95
                shadow-sm hover:shadow-md
              "
            >
              Start Shopping
            </button>

          </div>
        )}

        {/* ORDERS LIST */}
        {!isLoading && userOrders.length > 0 && (
          <div className="grid gap-6 md:grid-cols-1">
            {userOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default OrdersPage;