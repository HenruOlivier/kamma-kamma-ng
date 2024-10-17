// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Get all images
router.get('/', imageController.getAllImages);

// Get a specific image by ID
router.get('/:id', imageController.getImageById);

// Create a new image
router.post('/', imageController.createImage);

// Update an image
router.put('/:id', imageController.updateImage);

// Delete an image
router.delete('/:id', imageController.deleteImage);

module.exports = router;