const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional: link to a user if you have user authentication
  }
});

// Generate the public URL for the file
fileSchema.methods.getUrl = function(req) {
  return `${req.protocol}://${req.get('host')}/files/${this.filename}`;
};

module.exports = mongoose.model('File', fileSchema);