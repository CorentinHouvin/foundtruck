const mongoose = require('mongoose');

var pictureSchema = new mongoose.Schema({
    _idFoodtruck: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    // TO DO
    url: {
        type: String
    },
    position: {
        type: Number
    }
});

mongoose.model('Picture', pictureSchema, 'picture');