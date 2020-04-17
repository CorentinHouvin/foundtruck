const mongoose = require('mongoose');

var foodtruckSchema = new mongoose.Schema({
    _idUser: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        default: ''
    },
    contact_email: {
        type: String,
        default: ''
    },
    phone_number: {
        type: Date,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    lat: {
        type: Number,
        default: ''
    },
    long: {
        type: Number,
        default: ''
    },
    open: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Foodtruck', foodtruckSchema, 'foodtruck');