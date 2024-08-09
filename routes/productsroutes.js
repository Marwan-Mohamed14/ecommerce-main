const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller'); // Correct import
const upload = require('../JavaScript/UploadPhoto'); // Import multer configuration

// Route to add a new product with image upload
router.post('/product', upload.single('productImage'), productController.addProduct);

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to update a product by name
router.put('/products/:name', productController.updateProductByName);

// Route to delete a product by name
router.delete('/products/:name', productController.deleteProductByName);

module.exports = router;
