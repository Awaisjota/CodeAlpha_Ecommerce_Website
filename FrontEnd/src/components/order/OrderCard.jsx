import { useDispatch, useSelector } from "react-redux";
import { cancelDeleteOrder } from "../../features/orderSlice";

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.order);

  const items = Array.isArray(order?.products)
    ? order.products
    : Array.isArray(order?.items)
    ? order.items
    : [];

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return `${status.charAt(0).toUpperCase()}${status.slice(1).toLowerCase()}`;
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700 ring-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 ring-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 ring-red-200";
      default:
        return "bg-blue-100 text-blue-700 ring-blue-200";
    }
  };

  const handleCancel = () => {
    const confirm = window.confirm("Cancel this order?");
    if (!confirm) return;

    dispatch(cancelDeleteOrder(order._id));
  };

  const isCancelable =
    (order?.status || "").toLowerCase().trim() === "pending";

  return (
    <div
      className="
        bg-white border border-gray-200
        rounded-2xl
        shadow-sm hover:shadow-xl
        transition-all duration-300
        p-5
        hover:-translate-y-0.5
      "
    >

      {/* HEADER */}
      <div className="flex justify-between items-start gap-4">

        <div>
          <h2 className="text-sm text-gray-500">
            Order ID
          </h2>

          <h3 className="font-semibold text-gray-800 tracking-tight">
            #{order?._id?.slice(-6)}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* STATUS BADGE */}
        <span
          className={`
            px-3 py-1 text-xs font-semibold
            rounded-full ring-1
            shadow-sm
            ${getStatusStyle(order?.status)}
          `}
        >
          {formatStatus(order?.status)}
        </span>
      </div>

      {/* ITEMS */}
      <div className="mt-5 space-y-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
        {items.length > 0 ? (
          items.slice(0, 3).map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-sm text-gray-700"
            >
              <span className="truncate max-w-[75%]">
                • {item?.product?.name || item?.name || "Item"}
              </span>

              <span className="text-gray-500 font-medium">
                x{item?.quantity || 1}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">No items found</p>
        )}

        {items.length > 3 && (
          <p className="text-xs text-gray-400 pt-1">
            +{items.length - 3} more items
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">

        {/* PRICE */}
        <div>
          <p className="text-xs text-gray-400">Total Amount</p>
          <p className="text-xl font-bold text-green-600">
            Rs. {order?.totalPrice || 0}
          </p>
        </div>

        {/* ACTION */}
        <div>
          {isCancelable && (
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg
                transition-all duration-200
                active:scale-95

                ${
                  isLoading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                }
              `}
            >
              {isLoading ? "Cancelling..." : "Cancel Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;