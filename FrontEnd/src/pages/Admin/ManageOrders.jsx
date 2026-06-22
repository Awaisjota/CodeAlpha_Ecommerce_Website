import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiPackage,
  FiUser,
  FiCalendar,
  FiXCircle,
  FiTrash2,
} from "react-icons/fi";

import {
  getAllOrders,
  editOrder,
  deleteOrder,
  cancelDeleteOrder,
} from "../../features/orderSlice";

const ManageOrders = () => {
  const dispatch = useDispatch();

  const { orders = [], isLoading, error } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // 🎨 STATUS BADGES
  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // 🔄 STATUS UPDATE (SAFE)
  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(
        editOrder({ id, data: { status } })
      ).unwrap();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // ❌ CANCEL ORDER
  const handleCancel = async (id) => {
    const ok = window.confirm("Cancel this order?");
    if (!ok) return;

    try {
      await dispatch(cancelDeleteOrder(id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ DELETE ORDER
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this order permanently?"
    );
    if (!ok) return;

    try {
      await dispatch(deleteOrder(id)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  // SELECT COMPONENT
  const StatusSelect = ({ order }) => (
    <select
      value={order.status}
      onChange={(e) =>
        handleStatusChange(order._id, e.target.value)
      }
      className="border text-xs p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
    >
      <option value="pending">Pending</option>
      <option value="processing">Processing</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );

  // ACTION BUTTONS
  const Actions = ({ order }) => (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => handleCancel(order._id)}
        className="flex items-center gap-1 text-yellow-600 hover:bg-yellow-50 px-3 py-1 rounded-lg text-xs font-medium transition"
      >
        <FiXCircle size={14} />
        Cancel
      </button>

      <button
        onClick={() => handleDelete(order._id)}
        className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-xs font-medium transition"
      >
        <FiTrash2 size={14} />
        Delete
      </button>
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FiPackage className="text-blue-600" size={26} />
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Orders
          </h1>
        </div>

        <span className="text-sm bg-white shadow px-3 py-1 rounded-full font-medium text-gray-600">
          Total: {orders.length}
        </span>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="text-center py-10 text-gray-500">
          Loading orders...
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && orders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow">
          <FiPackage
            className="mx-auto text-gray-300 mb-2"
            size={45}
          />
          <p className="text-gray-500">No orders found</p>
        </div>
      )}

      {/* DATA */}
      {!isLoading && orders.length > 0 && (
        <>
          {/* TABLE VIEW */}
          <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Order ID</th>
                  <th className="text-left">User</th>
                  <th className="text-left">Total</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Date</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="text-gray-600">
                      {order.user?.name || "Guest"}
                    </td>

                    <td className="text-green-600 font-semibold">
                      Rs. {order.totalPrice}
                    </td>

                    <td className="space-y-2 max-w-[160px]">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${statusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <StatusSelect order={order} />
                    </td>

                    <td className="text-xs text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </td>

                    <td>
                      <Actions order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW */}
          <div className="md:hidden flex flex-col gap-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow rounded-xl p-4"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">
                    #{order._id.slice(-6)}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-full text-xs ${statusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm mb-1 text-gray-600">
                  <FiUser size={14} />
                  {order.user?.name || "Guest"}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <FiCalendar size={14} />
                  {new Date(
                    order.createdAt
                  ).toLocaleString()}
                </div>

                <p className="text-green-600 font-semibold mb-3">
                  Rs. {order.totalPrice}
                </p>

                <StatusSelect order={order} />

                <div className="mt-3">
                  <Actions order={order} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageOrders;