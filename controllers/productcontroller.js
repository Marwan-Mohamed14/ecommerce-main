
const Product = require('../models/product'); // Ensure this path is correct

exports.getProductByName = (req, res) => {
    const { name } = req.params;
    Product.findOne({ name })
        .then(product => {
            if (!product) {
                return res.status(404).send('Product not found');
            }
            res.status(200).json(product);
        })
        .catch(error => {
            console.error('Error fetching product:', error);
            res.status(500).send('Internal server error');
        });
};

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
    const { name, price, image, quantity, company } = req.body;
    const newProduct = new Product({
        name,
        price,
        image,
        quantity,
        company
    });

    newProduct.save()
        .then(() => {
            res.status(201).send('Product added successfully');
        })
        .catch(error => {
            console.error('Error adding product:', error);
            res.status(500).send('Internal server error');
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
