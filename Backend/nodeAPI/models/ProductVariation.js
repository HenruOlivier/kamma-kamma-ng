// models/ProductVariation.js
const mongoose = require('mongoose');

const ProductVariationSchema = new mongoose.Schema({
  name: String,
  stockQuantity: Number,
});

module.exports = mongoose.model('ProductVariation', ProductVariationSchema);