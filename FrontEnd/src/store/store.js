import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import orderReducer from "../features/orderSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
    cart: cartReducer,
  },
});