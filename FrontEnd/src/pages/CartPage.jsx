import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import CartItem from "../components/cart/CartItem";
import { getCart, clearCart } from "../features/cartSlice";

// ── Constants ─────────────────────────────────────────────────────────────────
const FREE_SHIPPING_THRESHOLD = 1500;
const FLAT_SHIPPING            = 50;
const TAX_RATE                 = 0.12;

// ── Helper: resolve price from either a populated or plain item ───────────────
const resolvePrice = (item) =>
  Number(
    item.price ??
    (item.product && typeof item.product === "object" ? item.product.price : 0) ??
    0
  );

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, isLoading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const items = Array.isArray(cart?.items) ? cart.items : [];

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal   = items.reduce((acc, i) => acc + resolvePrice(i) * Number(i.quantity ?? 0), 0);
  const totalUnits = items.reduce((acc, i) => acc + Number(i.quantity ?? 0), 0);
  const shipping   = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax        = Math.round(subtotal * TAX_RATE);
  const total      = subtotal + shipping + tax;

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // ── Clear cart — inline confirm (no window.confirm) ───────────────────────
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearCart = useCallback(() => {
    if (confirmClear) {
      dispatch(clearCart());
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  }, [confirmClear, dispatch]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {totalUnits > 0
              ? `${totalUnits} item${totalUnits !== 1 ? "s" : ""} in your cart`
              : "Review your items before checkout"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
          >
            Continue Shopping
          </button>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearCart}
              className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                confirmClear
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-50 text-red-500 hover:bg-red-100"
              }`}
            >
              {confirmClear ? "Are you sure?" : "Clear Cart"}
            </button>
          )}
        </div>
      </div>

      {/* Loading overlay — shown whenever fetching, regardless of existing items */}
      {isLoading && (
        <div className="py-6 text-center text-sm text-gray-400 animate-pulse">
          Updating cart…
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="py-6 px-4 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
          {typeof error === "string" ? error : error?.message ?? "Something went wrong."}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && items.length === 0 && (
        <div className="text-center py-20 sm:py-24 bg-white border rounded-2xl shadow-sm">
          <p className="text-4xl mb-3">🛍️</p>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600">Your cart is empty</h2>
          <p className="text-sm text-gray-400 mt-1">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-5 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 text-sm transition-colors"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* Main content */}
      {!error && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
            {items.map((item) => {
              const keyId =
                item.product && typeof item.product === "object"
                  ? item.product._id
                  : item.product || item._id;
              return <CartItem key={String(keyId)} item={item} />;
            })}
          </div>

          {/* Order summary */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-md border h-fit lg:sticky lg:top-6">
            <h2 className="text-lg sm:text-xl font-bold mb-5">Order Summary</h2>

            {/* Free shipping progress */}
            {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="mb-5">
                <p className="text-xs text-gray-500 mb-1.5">
                  Add{" "}
                  <span className="font-semibold text-gray-700">
                    Rs.&nbsp;{amountToFreeShipping.toLocaleString()}
                  </span>{" "}
                  more for free shipping!
                </p>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {subtotal >= FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
              <div className="mb-5 text-xs text-green-600 font-medium bg-green-50 rounded-lg px-3 py-2">
                🎉 You've unlocked free shipping!
              </div>
            )}

            {/* Line items */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({totalUnits} item{totalUnits !== 1 ? "s" : ""})</span>
                <span className="text-gray-700 font-medium">Rs.&nbsp;{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : "text-gray-700"}>
                  {shipping === 0 ? "Free" : `Rs.\u00a0${shipping.toLocaleString()}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Tax (12%)</span>
                <span className="text-gray-700">Rs.&nbsp;{tax.toLocaleString()}</span>
              </div>

              <div className="flex justify-between pt-3 border-t text-base font-bold">
                <span>Total</span>
                <span className="text-green-600">Rs.&nbsp;{total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              disabled={items.length === 0 || isLoading}
              className="mt-5 w-full py-3 rounded-xl font-semibold text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>

            <p className="text-center text-[11px] text-gray-400 mt-3">
              Prices and shipping calculated at checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;