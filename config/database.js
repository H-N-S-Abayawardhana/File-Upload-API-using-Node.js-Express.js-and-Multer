const mongoose = require('mongoose');

// Get MongoDB connection string from environment variable or use default
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/file-upload-api';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;