const Image = require('../models/Image');
const path = require('path');
const { apiResponse } = require('../utils/response');

const IMAGE_STORAGE_PATH = path.join(__dirname, '../images');

const fsPromises = require('fs').promises;
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

    try {
        // Rename the file (no callback needed, use await)
        await fsPromises.rename(oldImagePath, newImagePath);

        // Save to MongoDB *only after* successful rename
        const galleryItem = new Image({
            name: nameFromRequestBody,
            description: req.body.description || '',
            url: newImageName,
        });

        await galleryItem.save();
        return apiResponse(res, 201, 'Gallery item added successfully', galleryItem);
    } catch (error) {
        console.error('Error processing gallery item:', error);
        return apiResponse(res, 500, 'Error processing gallery item');
    }
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
        const galleryItem = await Image.findById(req.params._id);
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
            const imgPath = path.join(IMAGE_STORAGE_PATH, result.url);
            console.log('image path to unlink: ', imgPath);

            try {
                await fsPromises.access(imgPath); // Check if file exists
                await fsPromises.unlink(imgPath);
                console.log('File deleted successfully');
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.warn('File not found, skipping deletion');
                } else {
                    throw err; // Rethrow other errors
                }
            }
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