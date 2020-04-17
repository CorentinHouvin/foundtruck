const mongoose = require('mongoose');
const _ = require('lodash');

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

module.exports.consumerProfile = (req, res, next) => {
    Consumer.findOne({ _idUser: req._id },
        (err, consumer) => {
            if (!consumer)
                return res.status(404).json({ status: false, message: 'Consumer non trouvé.' });
            else
                return res.status(200).json({ status: true, consumer: _.pick(consumer, ['first_name', 'last_name']) });
        }
    );
}