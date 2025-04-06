// models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  coverImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('Category', CategorySchema);