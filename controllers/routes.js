const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const categoryModel = require('../models/categoryModel');

//add product route
router.post('/addProduct', (req, res) => {
    const newProduct = new productModel({
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
        usage: req.body.usage
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
	const users = await userModel.find({}, 'email role',)
	res.send(users)
})


//get only roles from users 
router.get("/user/roles", async (req, res) => {
	const roles = await userModel.find({}, 'role')
    res.send(roles)
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
        return res.status(200).json({userId: user._id, status: 'ok', user: user.email, role: user.role});
    } else{
        res.status(400).json({status: 'error', user:false});
    }
})

//delete specific product
router.delete("/products/delete", async (req, res) => {
    const product = await productModel.deleteOne(
        {
            name: req.body.name,
            
        }
    )
})

//delete specific user
router.delete("/user/delete", async (req, res) => {
    const user = await userModel.deleteOne(
        {
            email: req.body.email,
            
        }
    )
})

//update a product
router.put("/products/update", async (req, res) => {
    const filter = { name: req.body.name  };
    const update = { quantity: req.body.quantity, category: req.body.category };
    
    
    let doc = await productModel.findOneAndUpdate(filter, update, {
        new: true
    });
})

//update a user
router.put("/user/update", async (req, res) => {
    const filter = { email: req.body.email  };
    const update = { role: req.body.role };
    
    
    let doc = await userModel.findOneAndUpdate(filter, update, {
        new: true
    });
})

//update a user password
router.put("/user/update/password", async (req, res) => {
    const filter = { email: req.body.email  };
    const update = { password: req.body.password };
    
    
    let doc = await userModel.findOneAndUpdate(filter, update, {
        new: true
    });
})

//delete category
router.delete("/categories/delete", async (req, res) => {
    const category = await categoryModel.deleteOne(
        {
            category: req.body.category
        }
    )
})

module.exports = router;