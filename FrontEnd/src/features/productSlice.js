import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductService, deleteProductService, editProductService, getAllProductsService, getProductByIdService } from "../services/productService";

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createProductService(data);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const getAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllProductsService();
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const getProductById = createAsyncThunk(
    "products/getProductById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProductByIdService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const editProduct = createAsyncThunk(
    "products/editProduct",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await editProductService({ id, data });
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteProductService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);


const productSlice = createSlice({
    name: "product",
    initialState: {
        isLoading: false,
        error: null,
        products: [],
        selectedProduct: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = state.products.map((p) =>
                    p._id === action.payload._id ? action.payload : p
                );
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = state.products.filter(
                    (p) => p._id !== action.payload._id
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }

})

export default productSlice.reducer;