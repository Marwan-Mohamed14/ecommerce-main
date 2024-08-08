
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
    
        quantity: {
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        //yarab
      
    },
{
    Timestamp: true
}
);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;