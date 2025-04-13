// controllers/categoryController.js
const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('coverImage') // Populate the coverImage field
      .populate('products'); // Populate the products field
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('coverImage') // Populate the coverImage field
      .populate('products'); // Populate the products field
    if (!category)
      return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('coverImage') // Populate the coverImage field
      .populate('products'); // Populate the products field
    if (!updatedCategory)
      return res.status(404).json({ message: 'Category not found' });
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted', category: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products in a specific category
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate({
        path: 'products',
        populate: {
          path: 'images', // Populate the images field in each product
          model: 'Image', // Specify the model for the images
        },
      });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category.products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: error.message });
  }
};