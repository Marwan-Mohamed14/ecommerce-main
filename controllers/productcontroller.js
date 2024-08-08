const multer = require('multer');
const path = require('path');
const Product = require('../models/product'); 
const upload = require('../JavaScript/UploadPhoto'); // Import multer configuration

exports.getAllProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal server error');
        });
};

exports.addProduct = (req, res) => {
    upload.single('productImage')(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('Multer error: ' + err.message);
        } else if (err) {
            return res.status(400).send('Error: ' + err.message);
        }

        console.log('Uploaded File:', req.file); // Log uploaded file details
        const { name, price, quantity,description } = req.body;
        const imageUrl = req.file ? '/Pictures/' + req.file.filename : '';

        console.log('Image URL:', imageUrl); // Log constructed image URL

        const newProduct = new Product({
            name,
            price,
            quantity,
            description,
            image: imageUrl
        });

        newProduct.save()
            .then(() => {
                res.status(201).send('Product added successfully');
            })
            .catch(error => {
                console.error('Error adding product:', error);
                res.status(500).send('Internal server error');
            });
    });
};

exports.updateProductByName = (req, res) => {
    const { name } = req.params;
    const updates = req.body;

    Product.findOneAndUpdate({ name }, updates, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).json(product);
        })
        .catch(error => {
            console.error('Error updating product:', error);
            res.status(500).send('Internal server error');
        });
};

exports.deleteProductByName = (req, res) => {
    const { name } = req.params;

    Product.findOneAndDelete({ name })
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).send('Product deleted successfully');
        })
        .catch(error => {
            console.error('Error deleting product:', error);
            res.status(500).send('Internal server error');
        });
};
