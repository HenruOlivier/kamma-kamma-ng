// models/Image.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: String,
  description: String,
  name: String
});

module.exports = mongoose.model('Image', ImageSchema);