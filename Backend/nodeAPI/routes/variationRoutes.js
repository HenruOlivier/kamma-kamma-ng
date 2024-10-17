// routes/variationRoutes.js
const express = require('express');
const router = express.Router();
const variationController = require('../controllers/variationController');

// Get all variations
router.get('/', variationController.getAllVariations);

// Get a specific variation by ID
router.get('/:id', variationController.getVariationById);

// Create a new variation
router.post('/', variationController.createVariation);

// Update a variation
router.put('/:id', variationController.updateVariation);

// Delete a variation
router.delete('/:id', variationController.deleteVariation);

module.exports = router;