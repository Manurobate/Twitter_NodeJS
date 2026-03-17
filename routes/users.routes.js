const router = require('express').Router();
const {
    signupForm,
    signup,
    updateAvatar,
    displayUserProfile,
    userList,
    followUser,
    unfollowUser
} = require('../controllers/users.controller');
const {requireAuth} = require("../config/security.config");

router.get('/', userList);
router.get('/follow/:userId', followUser);
router.get('/unfollow/:userId', unfollowUser);
router.get('/:username', displayUserProfile);
router.get('/signup', signupForm);
router.post('/signup', signup);
router.post('/update/avatar', requireAuth, updateAvatar)

module.exports = router;