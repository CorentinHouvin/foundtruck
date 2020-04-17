const mongoose = require('mongoose');

var consumerSchema = new mongoose.Schema({
    _idUser: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date,
        default: ''
    },
    //TO DO
    profile_picture: {
        type: String,
        default: ''
    }
});

mongoose.model('Consumer', consumerSchema, 'consumer');
