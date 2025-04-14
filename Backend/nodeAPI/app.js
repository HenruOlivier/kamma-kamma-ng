const path = require('path');

// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const variationRoutes = require('./routes/variationRoutes');
const imageRoutes = require('./routes/imageRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/variations', variationRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/search', searchRoutes);

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// MongoDB Connection
mongoose.connect('mongodb://expeli-mongo:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  console.log('Connected to MongoDB');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
