import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartService, clearCartService, getCartService, removeFromCartService, updateQuantityService } from "../services/cartServices";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (data, { rejectWithValue }) => {
        try {
            await addToCartService(data);
            // fetch populated cart for UI consistency
            const cart = await getCartService();
            return cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getCartService();
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (id, { rejectWithValue }) => {
        try {
            await removeFromCartService(id);
            const cart = await getCartService();
            return cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);



export const clearCart = createAsyncThunk(
    "cart/clearCart",
    async (_, { rejectWithValue }) => {
        try {
            await clearCartService();
            const cart = await getCartService();
            return cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const updateQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            await updateQuantityService(productId, quantity);
            const cart = await getCartService();
            return cart;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);





const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isLoading: false,
        error: null,
        cart: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.cart = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                // API returns cart directly for this endpoint
                state.cart = action.payload && action.payload.cart ? action.payload.cart : action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            .addCase(clearCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                // clearCart may return a message; normalize to an empty cart
                if (action.payload && action.payload.cart) {
                    state.cart = action.payload.cart;
                } else {
                    state.cart = { items: [] };
                }
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateQuantity.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                // updateQuantity returns { success, message, cart }
                if (action.payload && action.payload.cart) {
                    state.cart = action.payload.cart;
                } else {
                    state.cart = action.payload;
                }
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }

})

export default cartSlice.reducer;