const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middlewares/multerConfig');

// POST route for single file upload
router.post('/upload', upload.single('file'), uploadController.uploadFile);

// POST route for multiple file uploads (up to 5)
router.post('/upload-multiple', upload.array('files', 5), uploadController.uploadMultiple);

// GET route to fetch a specific file by ID
router.get('/files/:id', uploadController.getFileById);

// DELETE route to remove a file
router.delete('/files/:id', uploadController.deleteFile);

// GET route to check upload API status
router.get('/upload-status', (req, res) => {
  res.status(200).json({ message: 'Upload API is active' });
});

module.exports = router;