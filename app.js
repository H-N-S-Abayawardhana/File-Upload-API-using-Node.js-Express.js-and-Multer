// Main application entry point with database integration
const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/upload');
const connectDB = require('./config/database');
require('dotenv').config(); // For environment variables

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder to serve uploaded files
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', uploadRoutes);

// Basic home route
app.get('/', (req, res) => {
  res.send('File Upload API is running. Use /api/upload to upload files.');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;