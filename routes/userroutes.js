const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/users', userController.getAllUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/add-user', userController.addUser);
router.post('/logout', userController.logout);
router.post('/update-user', userController.updateUser);
router.delete('/delete-user/:userId', userController.deleteUser);
router.get('/cartt', async (req, res) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.redirect('/login'); // Redirect to login if the user is not logged in
        }

        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.render('cartt', { cart: null, message: 'Your cart is empty' });
        }

        res.render('cartt', { cart, message: null });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
