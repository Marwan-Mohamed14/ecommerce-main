const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Route to get all users
router.get('/', userController.getAllUsers);




// Route to create a new user
router.post('/signup', userController.signup);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
