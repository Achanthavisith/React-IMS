const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
    },
    quantity: {
        type: 'number',
        required: true,
    },
    category: {
        type: 'String',
        required: true,
    },
    usage: {
        type: 'number',
        required: true,
    }
});

module.exports = mongoose.model('products', productModel);


