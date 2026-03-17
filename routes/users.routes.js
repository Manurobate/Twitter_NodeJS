const router = require('express').Router();
const {signupForm, signup, updateAvatar, displayUserProfile, userList} = require('../controllers/users.controller');
const {requireAuth} = require("../config/security.config");

router.get('/', userList);
router.get('/signup', signupForm);
router.get('/:username', displayUserProfile);
router.post('/signup', signup);
router.post('/update/avatar', requireAuth, updateAvatar)

module.exports = router;