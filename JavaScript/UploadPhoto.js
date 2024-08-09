const path = require('path');
const multer = require('multer');

// Define the storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/Pictures')); // Update path to reflect new directory location
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create an instance of multer with the specified storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept only jpeg and png files
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            console.log('Only jpg and png files are allowed');
            cb(null, false);
        }
    },
    limits: {
        // Limit file size to 5MB
        fileSize: 1024 * 1024 * 5
    }
});

module.exports = upload;
