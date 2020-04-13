const mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    _idMenu: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    special_diet: {
        type: String
    }
});

mongoose.model('Dish', dishSchema, 'dish');