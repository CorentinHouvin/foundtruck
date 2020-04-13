const mongoose = require('mongoose');

const Consumer = mongoose.model('Consumer');

module.exports.register = (req, res, next) => {
    var consumer = new Consumer();

    // Récupere l'id du user qui vient d'être insérer dans la collection user
    consumer._idUser = res._id;

    consumer.save((err) => {
        if (err)
            return next(err);
    });
}