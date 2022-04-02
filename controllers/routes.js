const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');
const { findOne } = require('../models/productModel');

//add product route
router.post('/addProduct', (req, res) => {
    const newProduct = new productModel({
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
    });
    //save product
    productModel.findOne({name: newProduct.name} , (err, existing) => {
        if (existing == null) {
            //save if user is new
            newProduct.save()
            .then(data => {
                res.json(data)
            }).catch((err) => {
                res.json(err)
            });
        } else {
            //return a status code for frontend
            return res.status(400).json({
                message: 'already exists'
            })
        }
    })
});

//add user route
router.post('/addUser', (req, res) => {
    const newUser = new userModel({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    });
    //check if user already exists
    userModel.findOne({email: newUser.email} , (err, existing) => {
        if (existing == null) {
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
                message: 'already exists'
            })
        }
    })
});

//add category route
router.post('/addCategory', (req, res) => {
    const newCategory = new categoryModel({
        category: req.body.category
    });
    //check if user already exists
    categoryModel.findOne({category: newCategory.category}, (err, existing) => {
        if (existing == null) {
            //save if category is new
            newCategory.save()
            .then(data => {
                res.json(data)
            }).catch((err) => {
                res.json(err)
            });
        } else {
            //return a status code for frontend
            return res.status(400).json({
                message: 'already exists'
            })
        }
    })
});

//get categories
router.get("/categories", async (req, res) => {
	const category = await categoryModel.find()
	res.send(category)
})

//get products
router.get("/products", async (req, res) => {
	const products = await productModel.find()
	res.send(products)
})

//get users
router.get("/users", async (req, res) => {
	const users = await userModel.find({}, 'email')
	res.send(users)
})

//get specific product name
router.get("/products/name", async (req, res) => {
	const products = await productModel.findOne({
        name: req.body.name,
    })
    res.send(products)
})

//get specific user param
router.post("/login", async (req, res) => {
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if(user) {
        return res.status(200).json({status: 'ok', user: user.email, role: user.role});
    } else{
        res.status(400).json({status: 'error', user:false});
    }
})



router.delete("/products/delete", async (req, res) => {
    const product = await productModel.deleteOne(
        {
            name: req.body.name,
            
        }
    )
})

router.put("/products/update", async (req, res) => {
/*
    const product = await productModel.findOneAndUpdate(
        {
            
            name: req.body.name,
            quantity: req.body.quantity,
            category: req.body.category,

        }
    )
*/

    const filter = { name: req.body.name  };
    const update = { quantity: req.body.quantity, category: req.body.category };
    
    
    let doc = await productModel.findOneAndUpdate(filter, update, {

      new: true
    });
})
    
module.exports = router;