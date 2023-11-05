import Book from "../models/Book.js";
import path from "path";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, description, author, category } = req.body;
    console.log("file:", req.file);
    console.log("path:", path.extname(req.file.originalname));
    const newBook = new Book({
      title,
      description,
      author,
      category: JSON.parse(category), // This should be an array of category IDs
      image: {
        name: req.file.filename,
        imageType: req.file.mimetype,
        extension: path.extname(req.file.originalname),
        destination: req.file.path,
      },
    });
    await newBook.save();
    res.status(200).json({ success: true, data: newBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single book by ID
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a book by ID
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
