const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    category: {
        type: 'String',
        required: true,
    }
});

module.exports = mongoose.model('category', categoryModel);