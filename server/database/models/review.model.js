const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    _idConsumer: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _idFoodtruck: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    }
});

mongoose.model('Review', reviewSchema, 'review');