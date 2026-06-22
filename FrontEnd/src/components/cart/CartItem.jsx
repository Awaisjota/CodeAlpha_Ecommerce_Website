import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../features/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // ── Normalise product data ────────────────────────────────────────────────
  const isProductObj = item.product && typeof item.product === "object";

  const productId = String(
    isProductObj ? item.product._id : item.product || item._id
  );

  const productData = isProductObj
    ? item.product
    : {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl || item.image,
        stock: item.stock ?? item.countInStock,
      };

  const price    = Number(productData.price ?? 0);
  const name     = productData.name || "Product";
  const image    = productData.imageUrl || "/placeholder.png";
  const maxStock = Number(productData.stock ?? 0);

  // ── Local quantity state ──────────────────────────────────────────────────
  const initialQty = Number(item.quantity || 1);
  const [localQty, setLocalQty] = useState(initialQty);

  // Keep in sync when the cart slice changes externally (e.g. server refresh)
  useEffect(() => {
    setLocalQty(initialQty);
  }, [initialQty]);

  // ── Debounced dispatch (300 ms) ───────────────────────────────────────────
  const lastDispatchedQty = useRef(initialQty);
  const debounceTimer     = useRef(null);

  useEffect(() => {
    if (localQty === lastDispatchedQty.current) return;

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      lastDispatchedQty.current = localQty;
      dispatch(updateQuantity({ productId, quantity: localQty }));
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [localQty, productId, dispatch]);

  // ── Quantity helpers ──────────────────────────────────────────────────────
  const clamp = (val) => {
    let v = val;
    if (v < 1) v = 1;
    if (maxStock > 0 && v > maxStock) v = maxStock;
    return v;
  };

  const increase = useCallback(
    () => setLocalQty((q) => clamp(q + 1)),
    [maxStock]
  );

  const decrease = useCallback(
    () => setLocalQty((q) => clamp(q - 1)),
    []
  );

  const onChange = useCallback(
    (e) => {
      const parsed = parseInt(e.target.value, 10);
      setLocalQty(clamp(Number.isNaN(parsed) ? 1 : parsed));
    },
    [maxStock]
  );

  // ── Remove ────────────────────────────────────────────────────────────────
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleRemove = useCallback(() => {
    if (confirmRemove) {
      dispatch(removeFromCart(productId));
    } else {
      setConfirmRemove(true);
      // Auto-cancel after 3 s so the UI doesn't stay in "confirm" forever
      setTimeout(() => setConfirmRemove(false), 3000);
    }
  }, [confirmRemove, productId, dispatch]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const atMin      = localQty <= 1;
  const atMax      = maxStock > 0 && localQty >= maxStock;
  const lineTotal  = Math.round(price * localQty);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">

      {/* Thumbnail */}
      <div className="flex justify-center sm:justify-start shrink-0">
        <img
          src={image}
          alt={name}
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-gray-100 shadow-sm"
        />
      </div>

      {/* Info + controls */}
      <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">

        {/* Name + unit price */}
        <div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-800 truncate" title={name}>
            {name}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Unit price:{" "}
            <span className="font-medium text-gray-600">Rs.&nbsp;{price.toLocaleString()}</span>
          </p>
        </div>

        {/* Quantity stepper */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="inline-flex items-center border border-gray-200 rounded-full bg-gray-50 shadow-sm overflow-hidden select-none">
            <button
              onClick={decrease}
              disabled={atMin}
              aria-label="Decrease quantity"
              className="px-3 py-1.5 text-base font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              −
            </button>

            {/* Hide the native number-input spinner arrows */}
            <input
              type="number"
              value={localQty}
              onChange={onChange}
              min={1}
              max={maxStock || undefined}
              aria-label="Quantity"
              className="w-12 text-center bg-transparent outline-none text-sm font-semibold text-gray-800 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <button
              onClick={increase}
              disabled={atMax}
              aria-label="Increase quantity"
              className="px-3 py-1.5 text-base font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>

          {maxStock > 0 && (
            <span className={`text-[11px] ${atMax ? "text-orange-400 font-medium" : "text-gray-400"}`}>
              {atMax ? "Max stock reached" : `${maxStock} in stock`}
            </span>
          )}
        </div>
      </div>

      {/* Subtotal + remove */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">

        {/* Subtotal */}
        <div className="text-right">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Subtotal</p>
          <p className="text-base sm:text-lg font-bold text-gray-900">
            Rs.&nbsp;{lineTotal.toLocaleString()}
          </p>
        </div>

        {/* Single remove button — works on all screen sizes */}
        <button
          onClick={handleRemove}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors font-medium ${
            confirmRemove
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
          }`}
        >
          {confirmRemove ? "Confirm?" : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartItem;