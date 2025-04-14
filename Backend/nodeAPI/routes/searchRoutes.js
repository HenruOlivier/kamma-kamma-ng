// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Routes
router.get('/', searchController.getAllSearchItems);

module.exports = router;