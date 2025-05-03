# File Upload API

A simple yet robust API for file uploads built with Node.js, Express, and Multer.

## Features

- Single file upload
- Multiple file upload (up to 5 files)
- File type filtering (configurable)
- File size limits (default: 5MB)
- Unique filenames to prevent overwriting
- Simple RESTful API

## Project Structure

```
file-upload-api/
├── uploads/                 <-- Stores uploaded files
├── routes/
│   └── upload.js            <-- Defines the upload endpoints
├── controllers/
│   └── uploadController.js  <-- Handles upload logic
├── middlewares/
│   └── multerConfig.js      <-- Configures Multer (file limits, storage, filters)
├── app.js                   <-- Entry point, sets up server and routes
├── .gitignore               <-- Ignore node_modules, uploads, etc.
├── package.json             <-- Project metadata and dependencies
└── README.md                <-- Project documentation
```

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Upload a Single File
- **URL**: `/api/upload`
- **Method**: `POST`
- **Form Data**:
  - `file`: The file to upload
- **Response**:
  ```json
  {
    "message": "File uploaded successfully",
    "file": {
      "filename": "file-1620000000000-123456789.jpg",
      "originalname": "example.jpg",
      "mimetype": "image/jpeg",
      "size": 12345,
      "url": "http://localhost:3000/files/file-1620000000000-123456789.jpg"
    }
  }
  ```

### Upload Multiple Files
- **URL**: `/api/upload-multiple`
- **Method**: `POST`
- **Form Data**:
  - `files`: The files to upload (maximum 5)
- **Response**:
  ```json
  {
    "message": "3 files uploaded successfully",
    "files": [
      {
        "filename": "files-1620000000000-123456789.jpg",
        "originalname": "example1.jpg",
        "mimetype": "image/jpeg",
        "size": 12345,
        "url": "http://localhost:3000/files/files-1620000000000-123456789.jpg"
      },
      {
        "filename": "files-1620000000001-987654321.pdf",
        "originalname": "document.pdf",
        "mimetype": "application/pdf",
        "size": 54321,
        "url": "http://localhost:3000/files/files-1620000000001-987654321.pdf"
      },
      {
        "filename": "files-1620000000002-456123789.png",
        "originalname": "image.png",
        "mimetype": "image/png",
        "size": 67890,
        "url": "http://localhost:3000/files/files-1620000000002-456123789.png"
      }
    ]
  }
  ```

### Check API Status
- **URL**: `/api/upload-status`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "message": "Upload API is active"
  }
  ```

## Configuration

### File Size Limit
- Default: 5MB
- To change, modify `fileSize` in `middlewares/multerConfig.js`

### File Types
- Default: All file types allowed
- To restrict file types, uncomment and modify the `fileFilter` function in `middlewares/multerConfig.js`

### Maximum Files
- Default: 5 files per request
- To change, modify `files` limit in `middlewares/multerConfig.js`

## Error Handling

The API includes basic error handling for:
- Missing files
- File size exceeding limits
- File type restrictions (when enabled)
- Server errors

## License

ISC