import Category from "../models/Category.js";

// Handlers for the category routes
const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find category" });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    console.log("req:", req);
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (category == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find category" });
    }
    res.json({
      success: true,
      message: "The category is updated successfully.",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });

    if (category == null) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find category" });
    }
    res.json({
      success: true,
      message: "The category is deleted successfully.",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
