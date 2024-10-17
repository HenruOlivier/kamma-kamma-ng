// controllers/variationController.js
const ProductVariation = require('../models/ProductVariation');

// Get all variations
exports.getAllVariations = async (req, res) => {
  try {
    const variations = await ProductVariation.find()
      .populate('product')
      .populate('images');
    res.json(variations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get variation by ID
exports.getVariationById = async (req, res) => {
  try {
    const variation = await ProductVariation.findById(req.params.id)
      .populate('product')
      .populate('images');
    if (!variation)
      return res.status(404).json({ message: 'Variation not found' });
    res.json(variation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new variation
exports.createVariation = async (req, res) => {
  const variation = new ProductVariation(req.body);
  try {
    const newVariation = await variation.save();
    res.status(201).json(newVariation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a variation
exports.updateVariation = async (req, res) => {
  try {
    const updatedVariation = await ProductVariation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVariation)
      return res.status(404).json({ message: 'Variation not found' });
    res.json(updatedVariation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a variation
exports.deleteVariation = async (req, res) => {
  try {
    const deletedVariation = await ProductVariation.findByIdAndDelete(req.params.id);
    if (!deletedVariation)
      return res.status(404).json({ message: 'Variation not found' });
    res.json({ message: 'Variation deleted', variation: deletedVariation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
