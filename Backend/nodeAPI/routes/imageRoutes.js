// // routes/imageRoutes.js
// const express = require('express');
// const router = express.Router();
// const imageController = require('../controllers/imageController');

// // Get all images
// router.get('/', imageController.getAllImages);

// // Get a specific image by ID
// router.get('/:id', imageController.getImageById);

// // Create a new image
// router.post('/', imageController.createImage);

// // Update an image
// router.put('/:id', imageController.updateImage);

// // Delete an image
// router.delete('/:id', imageController.deleteImage);

// module.exports = router;

const express = require('express');
const gallery = express.Router();
const multer = require('multer');
const galleryController = require('../controllers/imageController');
const path = require('path');
const rateLimit = require("express-rate-limit");

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

const IMAGE_STORAGE_PATH = path.join(__dirname, '../images'); // Use an absolute path

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

gallery.post(
    '',
    uploadLimiter,
    upload.single('image'),  // Use .single() if there's only one file
    galleryController.addGalleryItem
);
gallery.get('/', galleryController.getAllGalleryItems);
gallery.get('/:_id', galleryController.getGalleryItem);
gallery.delete('/:_id', galleryController.deleteGalleryItem);
// gallery.put('/updateImageFile/:_id', upload.fields([{ name: 'image', maxCount: 1 }]), galleryController.updateGalleryItemImage);
gallery.put('/:_id', galleryController.updateGalleryItemMetadata);

module.exports = gallery;