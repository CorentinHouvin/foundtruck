const mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({
    _idFoodtruck: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String
    }
});

mongoose.model('Menu', menuSchema, 'menu');