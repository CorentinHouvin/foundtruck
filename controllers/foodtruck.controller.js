const mongoose = require('mongoose');
const _ = require('lodash');

const Foodtruck = mongoose.model('Foodtruck');

module.exports.register = (req, res, next) => {
    var foodtruck = new Foodtruck();

    // Récupere l'id du user qui vient d'être insérer dans la collection user
    foodtruck._idUser = res._id;

    foodtruck.save((err) => {
        if (err)
            return next(err);
    });
}

module.exports.allFoodtrucks = (req, res, next) => {
    Foodtruck.find(
        (err, foodtrucks) => {
            if (!foodtrucks)
                return res.status(404).json({ status: false, message: 'Aucun foodtruck trouvé.' });
            else
                return res.status(200).json({ status: true, foodtrucks: foodtrucks });
        }
    );
}

module.exports.foodtruckProfile = (req, res, next) => {
    console.log(req._id);
    Foodtruck.findOne({ _idUser: req._id },
        (err, foodtruck) => {
            if (!foodtruck)
                return res.status(404).json({ status: false, message: 'Foodtruck non trouvé.' });
            else
                return res.status(200).json({ status: true, foodtruck: _.pick(foodtruck, ['name', 'contact_email', 'phone_number', 'logo', 'lat', 'long', 'open']) });
        }
    );
}

module.exports.toggleFoodtruckOpen = (req, res, next) => {
    Foodtruck.findOneAndUpdate({ _idUser: req._id }, {$set: req.body}, {new: true},
        (err, foodtruck) => {
            if (!foodtruck)
                return res.status(404).json({ status: false, message: 'Foodtruck non trouvé.' });
            else
                return res.status(200).json({ status: true, foodtruck: _.pick(foodtruck, ['name', 'contact_email', 'phone_number', 'logo', 'lat', 'long', 'open']) });
        }
    );
}

module.exports.getFoodtruckDetail = (req, res, next) => {
    Foodtruck.findOne({ _id: req.query._id },
        (err, foodtruck) => {
            if (!foodtruck)
                return res.status(404).json({ status: false, message: 'Foodtruck non trouvé.' });
            else
                return res.status(200).json({ status: true, foodtruck: _.pick(foodtruck, ['_id', 'name', 'contact_email', 'phone_number', 'logo', 'lat', 'long', 'open']) });
        }
    );
}


