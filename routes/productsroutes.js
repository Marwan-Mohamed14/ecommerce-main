const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller'); // Correct import
const upload = require('../JavaScript/UploadPhoto'); // Import multer configuration

router.post('/product', upload.single('productImage'), productController.addProduct);
router.get('/products', productController.getAllProducts);
router.put('/products/:name', productController.updateProductByName);
router.delete('/products/:name', productController.deleteProductByName);

module.exports = router;
