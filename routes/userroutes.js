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

module.exports = router;
