const path = require('path');
const File = require('../models/file');

const uploadController = {
  // Handle single file upload
  uploadFile: async (req, res) => {
    try {
      // Check if file exists in request
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Create new file document in database
      const newFile = new File({
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size
        // Add userId if you have authentication
        // userId: req.user._id
      });

      // Save file metadata to database
      await newFile.save();

      // Construct file URL
      const fileUrl = newFile.getUrl(req);
      
      // Return success response with file details
      return res.status(200).json({
        message: 'File uploaded successfully',
        file: {
          id: newFile._id,
          filename: newFile.filename,
          originalname: newFile.originalname,
          mimetype: newFile.mimetype,
          size: newFile.size,
          url: fileUrl,
          uploadDate: newFile.uploadDate
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error uploading file',
        error: error.message 
      });
    }
  },

  // Handle multiple file uploads
  uploadMultiple: async (req, res) => {
    try {
      // Check if files exist in request
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const savedFiles = [];

      // Process each file and save to database
      for (const file of req.files) {
        const newFile = new File({
          filename: file.filename,
          originalname: file.originalname,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size
          // Add userId if you have authentication
          // userId: req.user._id
        });

        // Save to database
        await newFile.save();
        
        savedFiles.push({
          id: newFile._id,
          filename: newFile.filename,
          originalname: newFile.originalname,
          mimetype: newFile.mimetype,
          size: newFile.size,
          url: newFile.getUrl(req),
          uploadDate: newFile.uploadDate
        });
      }

      // Return success response with file details
      return res.status(200).json({
        message: `${savedFiles.length} files uploaded successfully`,
        files: savedFiles
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error uploading files',
        error: error.message 
      });
    }
  },

  // Get file by ID
  getFileById: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      return res.status(200).json({
        file: {
          id: file._id,
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: file.getUrl(req),
          uploadDate: file.uploadDate
        }
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error retrieving file',
        error: error.message 
      });
    }
  },

  // Delete file by ID
  deleteFile: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }

      // Delete file from filesystem
      const fs = require('fs');
      fs.unlink(file.path, async (err) => {
        if (err) {
          return res.status(500).json({ 
            message: 'Error deleting file from filesystem',
            error: err.message 
          });
        }
        
        // Delete metadata from database
        await File.findByIdAndDelete(req.params.id);
        
        return res.status(200).json({
          message: 'File deleted successfully'
        });
      });
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error deleting file',
        error: error.message 
      });
    }
  }
};

module.exports = uploadController;