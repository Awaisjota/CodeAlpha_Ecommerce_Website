import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);
router.delete("/", protect, clearCart);
router.put("/:productId", protect, updateQuantity);

export default router;