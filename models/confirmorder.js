const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true }
        }
    ],
    name: { type: String, required: true },
    address: { type: String, required: true },
    postalcode: { type: String, required: true },
    paymentMethod: { type: String, enum: ['visa', 'cash_on_delivery'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('order', orderSchema);
