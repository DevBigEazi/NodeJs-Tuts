const express = require('express');
const router = express.Router();
const path = require('path');

const products = require('./admin').products;

router.get("^/$|index|shop(.html)?", (req, res) => {
    res.render('shop', { prods: products, pageTitle: 'Shopify', path: '/' });
    console.log(products);
});

module.exports = router;
