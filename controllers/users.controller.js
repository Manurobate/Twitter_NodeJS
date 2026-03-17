const {
    createUser,
    findUserByUsername,
    searchUsers,
    findUserById,
    addUserIdToCurrentUserFollowing,
    removeUserIdToCurrentUserFollowing
} = require("../database/queries/users.queries");
const {getUserTweetsFromUserId} = require("../database/queries/tweets.queries");
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

exports.displayUserProfile = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await findUserByUsername(username);
        const tweets = await getUserTweetsFromUserId(user._id);
        res.render('tweets/tweet', {
            tweets,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user,
            user,
            editable: false
        });
    } catch (e) {
        next(e);
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

exports.userList = async (req, res, next) => {
    try {
        const users = await searchUsers(req.query.search);
        console.log(users);
        res.render('includes/search-menu', {users});
    } catch (e) {
        next(e);
    }

}

exports.followUser = async (req, res, next) => {
    try {
        const [, user] = await Promise.all([addUserIdToCurrentUserFollowing(req.params.userId, req.user), findUserById(req.params.userId)])
        res.redirect(`/users/${user.username}`);
    } catch (e) {
        next(e);
    }
}

exports.unfollowUser = async (req, res, next) => {
    try {
        const [, user] = await Promise.all([removeUserIdToCurrentUserFollowing(req.params.userId, req.user), findUserById(req.params.userId)])
        res.redirect(`/users/${user.username}`);
    } catch (e) {
        next(e);
    }
}
