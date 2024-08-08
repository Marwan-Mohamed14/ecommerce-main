const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Visa', 'Cash on Delivery'],
        required: true
    },
    visaInfo: {
        cardNumber: String,
        expiryDate: String,
        cvv: String
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now
    }
});


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
