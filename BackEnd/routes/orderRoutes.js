import express from "express";

import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  cancelDeleteOrder,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/my-orders", protect, getUserOrders);

router.get("/", protect, adminOnly, getAllOrders);

router.get("/:orderId", protect, getOrderById);

router.put("/:orderId", protect, adminOnly, updateOrderStatus);

router.delete("/:orderId", protect, adminOnly, deleteOrder);

router.delete("/cancel-delete/:orderId", protect, cancelDeleteOrder);

export default router;