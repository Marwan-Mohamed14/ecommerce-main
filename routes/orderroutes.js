const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

// Route to confirm an order
router.post('/confirm-order', orderController.confirmOrder);


module.exports = router;