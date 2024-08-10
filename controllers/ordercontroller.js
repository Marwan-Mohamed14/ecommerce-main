
const mongoose = require('mongoose'); 

// Example controller function
const Order = require('../models/confirmorder'); // Adjusted to match your model file name
const Cart = require('../models/cart');

exports.confirmOrder = async (req, res) => {
    try {
        const { name, address, postalcode, payment } = req.body;
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.redirect('/cartt');
        }

        const newOrder = new Order({
            userId,
            items: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            })),
            name,
            address,
            postalcode,
            paymentMethod: payment
        });

        await newOrder.save();

        await Cart.deleteOne({ userId });

        res.status(201).send('Order placed successfully');
    } catch (error) {
        console.error('Error confirming order:', error);
        res.status(500).send('Server error');
    }
};


