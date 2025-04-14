// controllers/productController.js
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllSearchItems = async (req, res) => {
  try {
    const searchQuery = req.query.search || '';

    // Search products and categories
    const products = await Product.find({ name: { $regex: searchQuery, $options: 'i' } }).populate('images');
    const categories = await Category.find({ name: { $regex: searchQuery, $options: 'i' } }).populate('coverImage');

    res.json({ products, categories });
  } catch (error) {
    console.error('Error while searching:', error);
    res.status(500).json({ message: 'Error while searching' });
  }
};