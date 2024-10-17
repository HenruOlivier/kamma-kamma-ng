// models/ProductVariation.js
const mongoose = require('mongoose');

const ProductVariationSchema = new mongoose.Schema({
  optionName: String,
  optionValue: String,
  price: Number,
  stockQuantity: Number,
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

module.exports = mongoose.model('ProductVariation', ProductVariationSchema);