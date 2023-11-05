import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController.js";

// Setting up routes
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
