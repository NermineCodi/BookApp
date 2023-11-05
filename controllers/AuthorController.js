import Author from "../models/Author.js";

// Handlers for the author routes
const createAuthor = async (req, res) => {
  const author = new Author(req.body);
  try {
    const newAuthor = await author.save();
    res.status(201).json({ success: true, data: newAuthor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json({ success: true, data: authors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find author" });
    }
    res.json({ success: true, data: author });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    console.log("req:", req);
    const author = await Author.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (author == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find author" });
    }
    res.json({ success: true, message: "The author is updated successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findOneAndDelete({ _id: req.params.id });

    if (author == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find author" });
    }
    res.json({ success: true, message: "The author is deleted successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { createAuthor, getAllAuthors, getAuthor, updateAuthor, deleteAuthor };
