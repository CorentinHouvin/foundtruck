const mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({
    _idConsumer: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _idFoodtruck: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

mongoose.model('Favorite', favoriteSchema, 'favorite');