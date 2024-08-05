const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/account', (req, res) => {
    res.render('account');
});

router.get('/admin', (req, res) => {
    res.render('admin');
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

router.get('/login', (req, res) => {
    res.render('login');
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

module.exports = router;
