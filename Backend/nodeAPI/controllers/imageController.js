// controllers/imageController.js
const Image = require('../models/Image');

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new image
exports.createImage = async (req, res) => {
  const image = new Image(req.body);
  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an image
exports.updateImage = async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedImage) return res.status(404).json({ message: 'Image not found' });
    res.json(updatedImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    if (!deletedImage) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Image deleted', image: deletedImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};