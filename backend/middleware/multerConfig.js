// middlewares/multerConfig.js

const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with original extension
  }
});

// Multer file filter
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true); // Accept images only
//   } else {
//     cb(new Error('File type not supported'), false);
//   }
// };

// Multer upload instance
const upload = multer({
  storage
});

module.exports = upload;
