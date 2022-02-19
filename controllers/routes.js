const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

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

router.post('/addUser', (req, res) => {
    const newUser = new userModel({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });
    newUser.save()
    .then(data => {
        res.json(data)
    }).catch((err) => {
        res.json(err)
    });
});

module.exports = router;