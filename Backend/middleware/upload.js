const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate secure filename: UUID + sanitized original name
    const fileExt = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, fileExt)
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .substring(0, 50); // Limit filename length
    const uniqueName = `${uuidv4()}-${baseName}${fileExt}`;
    cb(null, uniqueName);
  }
});

// Enhanced file filter
const fileFilter = (req, file, cb) => {
  try {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
    }

    if (file.size > maxSize) {
      return cb(new Error(`File size exceeds ${maxSize/1024/1024}MB limit`), false);
    }

    // Additional security checks
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(fileExt)) {
      return cb(new Error('Invalid file extension'), false);
    }

    cb(null, true);
  } catch (err) {
    cb(err, false);
  }
};

// Error handling middleware
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({
      success: false,
      message: err.code === 'LIMIT_FILE_SIZE' 
        ? 'File too large' 
        : 'File upload error'
    });
  } else if (err) {
    // Other errors
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload failed'
    });
  }
  next();
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10 // Maximum number of files
  }
});

module.exports = {
  upload,
  handleMulterErrors
};