const passport = require("passport");


exports.loginForm = (req, res, next) => {
    try {
        res.render('auth/login-form', {errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch (e) {
        next(e);
    }
};

exports.login = async (req, res, next) => {
    try {
        passport.authenticate('local', async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).render('auth/login-form', {
                errors: [info.message],
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            });

            req.login(user, (err) => {
                if (err) return next(err);
                res.redirect('/tweets');
            });
        })(req, res, next);
    } catch (e) {
        next(e);
    }
};

exports.logout = async (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) return next(err);
            res.redirect('/auth/login');
        });
    } catch (e) {
        next(e);
    }
}
