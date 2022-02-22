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
    //save product
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
    //check if user already exists
    userModel.findOne({email: newUser.email} , (err, existingUser) => {
        if (existingUser == null) {
            //save if user is new
            newUser.save()
            .then(data => {
                res.json(data)
            }).catch((err) => {
                res.json(err)
            });
        } else {
            //return a status code for frontend
            return res.status(400).json({
                message: 'user exists'
            })
        }
    })
});

//get products
router.get("/products", async (req, res) => {
	const products = await productModel.find()
	res.send(products)
})

//get users
router.get("/users", async (req, res) => {
	const users = await userModel.find()
	res.send(users)
})

//get specific user param
router.get("/user", async (req, res) => {
    const filter = req.body.email
	const user = await userModel.find({email: filter})
    res.send(user)
})



module.exports = router;