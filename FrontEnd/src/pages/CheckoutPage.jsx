import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { createOrder } from "../features/orderSlice";
import { clearCart } from "../features/cartSlice";

import Button from "../components/common/Button";
import Input from "../components/common/Input";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { isLoading: orderLoading, error: orderError } = useSelector(
    (state) => state.order
  );

  const cartItems = Array.isArray(cart?.items) ? cart.items : [];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        product: item.product?._id || item.product || item._id,
        quantity: item.quantity,
      })),
      shippingAddress: `${form.address}${form.city ? `, ${form.city}` : ""}`,
      paymentMethod: form.paymentMethod,
    };

    try {
      const resultAction = await dispatch(createOrder(orderData));
      unwrapResult(resultAction);

      alert("Order placed successfully!");

      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      const message = err.message || err?.data?.message || "Order failed!";
      alert(message);
    }
  };

  const PaymentCard = ({ label, value }) => (
    <label
      className={`
        flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer
        text-sm transition
        ${
          form.paymentMethod === value
            ? "border-black bg-gray-50"
            : "border-gray-300 hover:border-gray-400"
        }
      `}
    >
      <span className="text-gray-700 font-medium">{label}</span>
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={form.paymentMethod === value}
        onChange={handleChange}
      />
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Checkout 🧾
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fast & secure checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* LEFT FORM (COMPACT) */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">

            <h2 className="text-base font-semibold mb-4 text-gray-800">
              Delivery Info
            </h2>

            <div className="space-y-3">

              <Input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />

              <Input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <Input
                name="city"
                placeholder="City (optional)"
                value={form.city}
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                className="
                  w-full p-3
                  border border-gray-300
                  rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-black
                  transition
                  min-h-[90px]
                  text-sm
                "
              />

              {/* PAYMENT */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold text-gray-600 mb-2">
                  Payment Method
                </h3>

                <div className="space-y-2">
                  <PaymentCard label="COD" value="COD" />
                  <PaymentCard label="Card" value="CARD" />
                  <PaymentCard label="Online" value="ONLINE" />
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="mt-5">
              <Button
              type="button"
              text={orderLoading ? "Placing order..." : "Place Order"}
              onClick={placeOrder}
              disabled={orderLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
            />
            {orderError && (
              <p className="mt-3 text-sm text-red-600">
                {typeof orderError === "string"
                  ? orderError
                  : orderError?.message || "Unable to place order."}
              </p>
            )}
            </div>
          </div>

          {/* RIGHT SUMMARY (MORE CLEAN) */}
          <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm h-fit">

            <h2 className="text-base font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-md"
                >
                  <span className="truncate max-w-[70%] text-gray-700">
                    {item.name} × {item.quantity}
                  </span>

                  <span className="font-medium text-gray-800">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="mt-4 border-t pt-3 flex justify-between items-center">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="text-xl font-bold text-green-600">
                Rs. {totalPrice}
              </span>
            </div>

            <p className="mt-3 text-[11px] text-gray-400">
              🔒 Secure checkout • Cash on delivery available
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;