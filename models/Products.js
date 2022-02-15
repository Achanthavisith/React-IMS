const { model } = require('mongoose');
const mongoose = require("mongoose")


const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
quantity: {
    type: Number,
    reuqired: true,
},
category : {
 type: String,
 reuqired: true,
},

});
const ProductModel = mongoose.model('Products', ProductsSchema)

module.exports = ProductModel;