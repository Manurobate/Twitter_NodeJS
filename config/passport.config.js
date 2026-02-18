const {app} = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {findUserByEmail, findUserById} = require('../database/queries/users.queries');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        return done(null, user);
    } catch (e) {
        done(e);
    }

})

passport.use('local', new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const user = await findUserByEmail(email);
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        } else {
            return done(null, false, {message: 'Utilisateur inconnu'});
        }
    } catch (e) {
        return done(e);
    }
}))