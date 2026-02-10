const express = require('express');
const path = require('path');
const morgan = require("morgan");
const errorHanlder = require('errorhandler');
const index = require('./routes');
require('./database');

const app = express();
const port = process.env.PORT || 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use(index);

if (process.env.NODE_ENV === 'dev') {
    app.use(errorHanlder());
} else {
    // production
    console.log('in prod');
    app.use((err, req, res, _next) => {
        console.log('in mid error prod');
        const code = err.code || 500;

        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        });
    })
}
app.listen(port);
