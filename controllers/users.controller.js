const {createUser} = require("../database/queries/users.queries");


exports.signupForm = (req, res, next) => {
    try {
        res.render('users/user-form', {
            errors: null,
            user: {},
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        });
    } catch (e) {
        next(e);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const user = await createUser(req.body);
        req.login(user, (err) => {
            if (err) {
                next(err)
            }
            res.redirect('/tweets');
        })
    } catch (e) {
        const errors = e?.errors ? Object.keys(e.errors).map((key) => e.errors[key].message) : [e.message];
        res.status(400).render('users/user-form', {
            errors,
            user: {
                username: req.body?.username,
                email: req.body?.email,
            }, isAuthenticated: req.isAuthenticated(), currentUser: req.user
        });
    }
};
