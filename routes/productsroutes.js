const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Adjust the path to your Product model
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productcontroller');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/Pictures'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new product
router.post('/', upload.single('productImage'), async (req, res) => {
    try {
        const { name, price, quantity, description } = req.body;
        const newProduct = new Product({
            name,
            price,
            quantity,
            description,
            image: req.file ? `/Pictures/${req.file.filename}` : undefined // Ensure path is correct
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating new product:', error);
        res.status(400).json({ error: 'Bad request' });
    }
});



// Update a product
router.put('/:id', upload.single('productImage'), async (req, res) => {
    try {
        const { name, price, quantity, description } = req.body;
        const productId = req.params.id;

        // Construct update data
        const updateData = {
            name,
            price,
            quantity,
            description,
            // Check if a new file is uploaded
            image: req.file ? `/Pictures/${req.file.filename}` : undefined // Updated path to reflect new directory location
        };

        // Remove image property if no new image is uploaded
        if (!updateData.image) {
            delete updateData.image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/' , productController.getAllProducts2);

module.exports = router;
