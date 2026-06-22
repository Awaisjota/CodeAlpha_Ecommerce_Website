import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createOrderService,
    deleteOrderService,
    editOrderService,
    getAllOrdersService,
    getOrderByIdService,
    getUserOrdersService,
    cancelDeleteOrderService,
} from "../services/orderService";

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createOrderService(data);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const getAllOrders = createAsyncThunk(
    "orders/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllOrdersService();
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const getUserOrders = createAsyncThunk(
    "orders/getUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getUserOrdersService();
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const getOrderById = createAsyncThunk(
    "orders/getOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getOrderByIdService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const editOrder = createAsyncThunk(
    "orders/editOrder",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await editOrderService({ id, data });
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteOrderService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const cancelDeleteOrder = createAsyncThunk(
    "orders/cancelDeleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const res = await cancelDeleteOrderService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        isLoading: false,
        error: null,
        orders: [],
        userOrders: [],
        selectedOrder: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.orders.push(action.payload.order);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.orders = action.payload.orders;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getUserOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.userOrders = action.payload.orders;
            })
            .addCase(getUserOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.selectedOrder = action.payload.order;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const updated = action.payload.order;
                state.orders = state.orders.map((o) =>
                    o._id === updated._id ? updated : o
                );
            })
            .addCase(editOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.orders = state.orders.filter(
                    (o) => o._id !== action.meta.arg
                );
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(cancelDeleteOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(cancelDeleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;

                const id = action.meta.arg;

                state.userOrders = state.userOrders.filter(
                    (o) => o._id !== id
                );
            })
            .addCase(cancelDeleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }

})

export default orderSlice.reducer;