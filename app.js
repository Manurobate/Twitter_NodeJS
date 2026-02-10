const express = require('express');
const path = require('path');
const morgan = require("morgan");
const errorHanlder = require('errorhandler');

const app = express();

// Variables d'environnement
require('dotenv').config();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const morganFormat = process.env.MORGAN_FORMAT || 'combined';

// Connexion a MongoDB
require('./database');

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(morgan(morganFormat));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use(require('./routes'));

if (env === 'dev') {
    app.use(errorHanlder());
} else {
    // production
    console.log('in prod');
    app.use((err, req, res, _next) => {
        const code = err.code || 500;

        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        });
    })
}
app.listen(port);
