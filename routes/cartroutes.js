const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Import the cart controller

// Route to display the user's cart
router.get('/cartt', cartController.getCart);

// Route to add a product to the cart
router.post('/cart/add/:productId', cartController.addToCart);

// Route to remove a product from the cart
router.post('/cart/remove/:productId', cartController.removeFromCart);

module.exports = router;
