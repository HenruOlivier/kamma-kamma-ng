// // controllers/imageController.js
// const Image = require('../models/Image');

// // Get all images
// exports.getAllImages = async (req, res) => {
//   try {
//     const images = await Image.find();
//     res.json(images);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get image by ID
// exports.getImageById = async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//     if (!image) return res.status(404).json({ message: 'Image not found' });
//     res.json(image);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new image
// exports.createImage = async (req, res) => {
//   const image = new Image(req.body);
//   try {
//     const newImage = await image.save();
//     res.status(201).json(newImage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update an image
// exports.updateImage = async (req, res) => {
//   try {
//     const updatedImage = await Image.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedImage) return res.status(404).json({ message: 'Image not found' });
//     res.json(updatedImage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete an image
// exports.deleteImage = async (req, res) => {
//   try {
//     const deletedImage = await Image.findByIdAndDelete(req.params.id);
//     if (!deletedImage) return res.status(404).json({ message: 'Image not found' });
//     res.json({ message: 'Image deleted', image: deletedImage });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



const Image = require('../models/Image');
const path = require('path');
const { apiResponse } = require('../utils/response');

const IMAGE_STORAGE_PATH = path.join(__dirname, '../images');

const fs = require('fs');
if (!fs.existsSync(IMAGE_STORAGE_PATH)) {
    fs.mkdirSync(IMAGE_STORAGE_PATH, { recursive: true });
}

exports.addGalleryItem = async (req, res) => {
    console.log('file: ', req.file);

    // Ensure req.file exists
    if (!req.file) {
        return apiResponse(res, 400, 'No file uploaded');
    }

    const oldImageName = req.file.filename;
    const oldImagePath = path.join(IMAGE_STORAGE_PATH, oldImageName); // Correct path

    const mimeType = req.file.mimetype;
    const extension = mimeType.split('/').pop();

    // Read name from req.body
    let nameFromRequestBody = 'default-name';
    if (req.body && req.body.name) {
        nameFromRequestBody = req.body.name.toLowerCase().replace(/\s+/g, '-');
    }

    const newImageName = `${nameFromRequestBody}-${Date.now()}.${extension}`;
    const newImagePath = path.join(IMAGE_STORAGE_PATH, newImageName); // Correct path

    // Rename the file
    fs.rename(oldImagePath, newImagePath, async (err) => {
        if (err) {
            console.error('Error renaming file:', err);
            return apiResponse(res, 500, 'File renaming failed');
        }

        try {
            // Save to MongoDB *only after* successful rename
            const galleryItem = new Image({
                name: nameFromRequestBody,
                description: req.body.description || '',
                imagePath: newImageName,
            });

            await galleryItem.save();
            return apiResponse(res, 201, 'Gallery item added successfully', galleryItem);
        } catch (error) {
            console.error('Database save error:', error);
            return apiResponse(res, 500, 'Error saving gallery item');
        }
    });
};

exports.getAllGalleryItems = async (req, res) => {
    try {
        console.log('get all galery items called')
        const documents = await Image.find();
        console.log('gallery items: ', documents)
        return apiResponse(res, 200, 'Gallery items fetched successfully', documents);
    } catch (error) {
        return apiResponse(res, 500, 'Error fetching gallery items');
    }
};

exports.getGalleryItem = async (req, res) => {
    try {
        const galleryItem = await Image.findById(req.params.id);
        if (!galleryItem) {
            return apiResponse(res, 404, 'Gallery Item not found');
        }
        return apiResponse(res, 200, 'Gallery item fetched successfully', galleryItem);
    } catch (error) {
        return apiResponse(res, 500, 'Error fetching gallery item');
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const result = await Image.findByIdAndDelete(req.params._id);
        if (result) {
            const imgPath = path.join('/images', result.imagePath);
            await fs.unlink(imgPath);
        }
        return apiResponse(res, 200, 'Gallery item deleted successfully');
    } catch (error) {
        console.error(error);
        return apiResponse(res, 500, 'Error deleting gallery item');
    }
};

exports.updateGalleryItemMetadata = async (req, res) => {
    try {

        const galleryItem = await Image.findById(req.params._id);
        if (!galleryItem) {
            return apiResponse(res, 404, 'Gallery item not found');
        }
        const updatedGalleryItem = galleryItem.set(req.body);
        await updatedGalleryItem.save();
        return apiResponse(res, 200, 'Gallery item updated successfully', updatedGalleryItem);
    } catch (error) {
        return apiResponse(res, 500, 'Error updating gallery item');
    }
};

// New code for updating image
exports.updateGalleryItemImage = async (req, res) => {

    // Retrieve the ID of the gallery item to edit
    const itemId = req.params._id;
  
    try {
        // Find the existing item
        const existingItem = await Image.findById(itemId);
        if (!existingItem) {
            return apiResponse(res, 404, 'Gallery item not found');
        }

        // Get the existing image filename
        const existingFilename = existingItem.imagePath;
        console.log('updateGalleryItem >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', req.files['image'][0].filename);
        const newFilename = req.files['image'][0].filename;
        const tempImagePath = path.join('/images', newFilename);
        // const finalImagePath = path.join(__dirname, '..', 'images', existingFilename);
        const finalImagePath = path.join('/images', existingFilename);

        // Replace the existing image with the new one
        await fs.rename(tempImagePath, finalImagePath);

        // Update other fields if necessary
        if (req.body.name) existingItem.name = req.body.name;
        if (req.body.description) existingItem.description = req.body.description;

        // Save the updated item
        await existingItem.save();

        return apiResponse(res, 200, 'Gallery item updated successfully', existingItem);
    } catch (error) {
        // Compensating action here
        console.error(error);
        return apiResponse(res, 500, 'Error updating gallery item');
    }
};