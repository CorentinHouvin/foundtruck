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

module.exports.foodtruckProfile = (req, res, next) => {
    Foodtruck.find(
        (err, foodtrucks) => {
            if (!foodtrucks)
                return res.status(404).json({ status: false, message: 'Aucun foodtruck trouvé.' });
            else
                return res.status(200).json({ status: true, foodtrucks: foodtrucks });
        }
    );
}