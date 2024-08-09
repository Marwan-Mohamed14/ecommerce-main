const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const upload = require('../JavaScript/UploadPhoto'); // Import multer configuration

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('ManageProducts', { products });
    } catch (error) {
        res.status(500).send('Error rendering page');
    }
};

exports.addProduct = (req, res) => {
    upload.single('productImage')(req, res, async function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Multer error: ' + err.message);
        } else if (err) {
            return res.status(400).send('Error: ' + err.message);
        }

        console.log('Uploaded File:', req.file); // Log uploaded file details
        const { name, price, quantity, description } = req.body;
        const imageUrl = req.file ? '/Pictures/' + req.file.filename : '';

        console.log('Image URL:', imageUrl); // Log constructed image URL

        try {
            const newProduct = new Product({
                name,
                price,
                quantity,
                description,
                image: imageUrl
            });

            await newProduct.save();
            res.status(201).send('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send('Internal server error');
        }
    });
};

exports.updateProductByName = (req, res) => {
    const { name } = req.params;
    const updates = req.body;

    upload.single('productImage')(req, res, async function(err) {
        if (err) {
            return res.status(400).send('Error: ' + err.message);
        }

        if (req.file) {
            // Update image URL if a new image is uploaded
            updates.image = '/Pictures/' + req.file.filename;
        }

        try {
            const product = await Product.findOneAndUpdate({ name }, updates, { new: true });
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).send('Internal server error');
        }
    });
};


exports.deleteProductByName = (req, res) => {
    const { name } = req.params;

    Product.findOneAndDelete({ name })
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found');
            }

            // Delete the image file from the server
            if (product.image) {
                const imagePath = path.join(__dirname, '..', 'Pictures', path.basename(product.image));
                fs.unlink(imagePath, err => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    }
                });
            }

            res.status(200).send('Product deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            res.status(500).send('Internal server error');
        });
};
exports.getAllProducts2 = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('featured-items', { products });
    } catch (error) {
        res.status(500).send('Error rendering page');
    }
};