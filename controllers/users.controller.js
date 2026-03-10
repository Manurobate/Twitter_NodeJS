const {createUser} = require("../database/queries/users.queries");
const path = require("path");
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/avatars'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

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

exports.updateAvatar = [
    upload.single("profile-input"),
    async (req, res, next) => {
        try {
            const user = req.user;
            user.avatar = `/images/avatars/${req.file.filename}`;
            await user.save();
            res.redirect('/tweets');
        } catch (e) {
            next(e);
        }
    }
];
