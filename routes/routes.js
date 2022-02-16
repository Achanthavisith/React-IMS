const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel')

router.post('/addProduct', (req, res) => {
    const newProduct = new productModel({
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
    });
    newProduct.save()
    .then(data => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});

module.exports = router;