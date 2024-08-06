const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const productController = require('../controllers/productcontroller');
const User = require('../models/users');



// Inline middleware to check if the user is logged in
const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
};

// Middleware to redirect based on user type
const redirectBasedOnUserType = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId)
            .then(user => {
                if (user) {
                    if (user.Type === 'Admin') {
                        return res.redirect('/admin');
                    } else {
                        return res.redirect('/homepage');
                    }
                } else {
                    res.redirect('/login');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                res.status(500).send('Internal server error');
            });
    } else {
        res.redirect('/login');
    }
};

// Route to handle login and redirect based on user type
router.post('/login', userController.login, redirectBasedOnUserType);

// Route for logout
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal server error');
        }
        res.redirect('/login');
    });
});

// Public Routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});


router.use(authMiddleware); 

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/account', (req, res) => {
    res.render('account');
});

router.get('/buy', (req, res) => {
    res.render('buy');
});

router.get('/cartt', (req, res) => {
    res.render('cartt');
});

router.get('/changepass', (req, res) => {
    res.render('changepass');
});

router.get('/featured-items', (req, res) => {
    res.render('featured-items');
});

router.get('/homepage', (req, res) => {
    res.render('homepage');
});

router.get('/order', (req, res) => {
    res.render('order');
});

router.get('/preview', (req, res) => {
    res.render('preview');
});

router.get('/problem', (req, res) => {
    res.render('problem');
});

router.get('/admin', authMiddleware, (req, res) => {
    User.findById(req.session.userId)
        .then(user => {
            if (user && user.Type === 'Admin') {
                res.render('admin');
            } else {
                res.redirect('/homepage'); // Redirect non-admin users
            }
        })
        .catch(error => {
            console.error('Error checking user type:', error);
            res.status(500).send('Internal server error');
        });
});
router.post('/products/add', authMiddleware, productController.addProduct);

module.exports = router;
