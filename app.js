require('dotenv').config();
require('./database/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require("path");
const ejs = require("ejs");

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.set('views', __dirname + '/www');
app.use(express.static(path.join(__dirname, 'www')));

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server start at port : ${process.env.PORT}`));