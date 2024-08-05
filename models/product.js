
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required : true
        },
        image: {
            type: String,
            required: false

        },
        quantity: {
            type: Number,
            required: true
        },
        company: {
            type: String,
            required: true
        },
    },
{
    Timestamp: true
}
);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;