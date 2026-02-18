const {app} = require('../app');
const session = require('express-session');
const {MongoStore} = require('connect-mongo');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * process.env.SESSION_EXPIRATION,
        httpOnly: true,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 60 * 60 * 24 * process.env.SESSION_EXPIRATION
    })
}));
