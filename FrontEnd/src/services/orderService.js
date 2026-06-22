import Api from "../config/api";

export const createOrderService = async (data) => {
  try {
    const res = await Api.post("/orders", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserOrdersService = async () => {
  try {
    const res = await Api.get("/orders/my-orders");
    return res.data;
  } catch (error) {
    throw error;
  }
};  

export const getAllOrdersService = async () => {
  try {
    const res = await Api.get("/orders");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderByIdService = async (id) => {
  try {
    const res = await Api.get(`/orders/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const editOrderService = async ({ id, data }) => {
  try {
    const res = await Api.put(`/orders/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderService = async (id) => {
  try {
    const res = await Api.delete(`/orders/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const cancelDeleteOrderService = async (id) => {
  const res = await Api.delete(`/orders/cancel-delete/${id}`);
  return res.data;
};
