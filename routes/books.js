import express from "express";
import upload from "../middlewares/uploadMiddleware.js"; // Middleware for handling file uploads
const router = express.Router();

import {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/BookController.js";

// Setting up routes
router.post("/", upload.single("image"), createBook);
router.get("/", getAllBooks);
router.get("/:id", getBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
