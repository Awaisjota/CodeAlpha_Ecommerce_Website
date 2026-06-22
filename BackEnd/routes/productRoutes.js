import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";
import {protect, adminOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, adminOnly, createProduct);

router.get("/",  getAllProducts);

router.get("/:id", getProductById);

router.put("/:id", protect, adminOnly, editProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;