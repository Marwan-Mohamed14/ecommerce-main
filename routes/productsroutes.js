const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller'); 


router.get('/products/:name', productController.getProductByName); // Use productController
router.get('/products', productController.getAllProducts);
router.put('/products/:name', productController.updateProductByName);
router.delete('/products/:name', productController.deleteProductByName);
router.post('/products', productController.addProduct);

module.exports = router;
