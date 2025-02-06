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


// const IMAGE_STORAGE_PATH = path.join(__dirname, '..', 'images');
const IMAGE_STORAGE_PATH = '/images';

const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     const isValid = MIME_TYPE_MAP[file.mimetype];
    //     let error = new Error('Invalid mime type');
    //     if (isValid) {
    //         error = null;
    //     }
    //     cb(error, IMAGE_STORAGE_PATH);
    // },
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, IMAGE_STORAGE_PATH);  // And this one
    },
    filename: (req, file, cb) => {
        // const nameFromRequestBody = req.body.imageName.toLowerCase().split(' ').join('-');
        let nameFromRequestBody = 'default-name';
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, `${nameFromRequestBody}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    limits: { fileSize: 1024 * 1024 * 50 }, // 50MB
});

gallery.post(
    '',
    uploadLimiter,
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'imageName', maxCount: 1 }]),
    galleryController.addGalleryItem
);
gallery.get('/', galleryController.getAllGalleryItems);
gallery.get('/:_id', galleryController.getGalleryItem);
gallery.delete('/:_id', galleryController.deleteGalleryItem);
// gallery.put('/updateImageFile/:_id', upload.fields([{ name: 'image', maxCount: 1 }]), galleryController.updateGalleryItemImage);
gallery.put('/:_id', galleryController.updateGalleryItemMetadata);

module.exports = gallery;