const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, err => {
    if (!err) {
      console.log("MongoDB connection succeeded.");
    } else {
      console.log(
        "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
      );
    }
  }
);

// Call models
require('./models/consumer.model');
require('./models/dish.model');
require('./models/favorite.model');
require('./models/foodtruck.model');
require('./models/menu.model');
require('./models/picture.model');
require('./models/review.model');
require('./models/user.model');