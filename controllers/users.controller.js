const {createUser} = require("../database/queries/users.queries");


exports.signupForm = (req, res, next) => {
    try {
        res.render('users/user-form', {errors: null, user: {}});
    } catch (e) {
        next(e);
    }
};

exports.signup = async (req, res) => {
    try {
        await createUser(req.body);

        res.redirect('/tweets');
    } catch (e) {
        const errors = e?.errors ? Object.keys(e.errors).map((key) => e.errors[key].message) : [e.message];
        res.status(400).render('users/user-form', {
            errors,
            user: {
                username: req.body?.username,
                email: req.body?.email,
            },
        });
    }
};
