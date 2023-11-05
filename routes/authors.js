import express from "express";
const router = express.Router();
import {
  createAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/AuthorController.js";

// Setting up routes
router.post("/", createAuthor);
router.get("/", getAllAuthors);
router.get("/:id", getAuthor);
router.patch("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
