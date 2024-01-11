const express = require('express');
const router = express.Router();
const path = require('path');
const { route } = require('./root');

const products = [];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'addProduct.html'));
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    products.push({ title: req.body.title })
    res.redirect('/');
});


// exports.routes = router;
// exports.products = products;

module.exports = { router, products };