import Api from "../config/api";

export const createProductService = async (data) => {
  try {
    const res = await Api.post("/products/create", data);
    return res.data.product;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsService = async () => {
  try {
    const res = await Api.get("/products");
    return res.data.products || [];
  } catch (error) {
    throw error;
  }
};

export const getProductByIdService = async (id) => {
  try {
    const res = await Api.get(`/products/${id}`);
    return res.data.product;
  } catch (error) {
    throw error;
  }
};

export const editProductService = async ({ id, data }) => {
  try {
    const res = await Api.put(`/products/${id}`, data);
    return res.data.updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProductService = async (id) => {
  try {
    await Api.delete(`/products/${id}`);
    return { _id: id };
  } catch (error) {
    throw error;
  }
};