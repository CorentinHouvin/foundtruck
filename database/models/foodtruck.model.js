const mongoose = require('mongoose');

var foodtruckSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
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
    principal_picture: {
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
    },
    slug: {
        type: String
    }
});

function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return str;
}

mongoose.model('Foodtruck', foodtruckSchema, 'foodtruck');