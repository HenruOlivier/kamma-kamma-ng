const mongoose = require('mongoose');

// Define the Variation subdocument schema
const VariationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stockQuantity: { type: Number, default: 0 },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  isHireable: { type: Boolean, default: false },
  isForSale: { type: Boolean, default: true },
  stockQuantity: { type: Number, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  variations: [VariationSchema],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
});

module.exports = mongoose.model('Product', ProductSchema);