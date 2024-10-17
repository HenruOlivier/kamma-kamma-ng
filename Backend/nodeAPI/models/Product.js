// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  isHireable: Boolean,
  isForSale: Boolean,
  stockQuantity: Number,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  variations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariation' }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
});

module.exports = mongoose.model('Product', ProductSchema);