import Api from "../config/api";

export const addToCartService = async (data) => {
  try {
    const res = await Api.post("/cart", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCartService = async () => {
  try {
    const res = await Api.get("/cart");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCartService = async (id) => {
  try {
    const res = await Api.delete(`/cart/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const clearCartService = async () => {
  try {
    const res = await Api.delete("/cart");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuantityService = async (productId, quantity) => {
  try {
    const res = await Api.put(`/cart/${productId}`, { quantity });
    return res.data;
  } catch (error) {
    throw error;
  }
};