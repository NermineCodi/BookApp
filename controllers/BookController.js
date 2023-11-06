import Book from "../models/Book.js";
import fs from "fs";
import path from "path";

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, description, author, category } = req.body;

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
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    console.log("BOOK:", book);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    } else {
      // Delete the image file from the filesystem
      const imagePath = book.image.destination;
      fs.unlink(imagePath, (err) => {
        if (err) {
          // Handle the error if the file doesn't exist or couldn't be deleted
          console.error("Failed to delete the image file:", err);
          return res.status(500).json({
            success: false,
            message: "Book is deleted but failed to delete the image file",
          });
        }
        console.log("Image file deleted successfully");

        res.json({
          success: true,
          message: "Book and image deleted successfully",
        });
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
