const router = require('express').Router();
const {signupForm, signup, updateAvatar} = require('../controllers/users.controller');
const {requireAuth} = require("../config/security.config");

router.get('/signup', signupForm);
router.post('/signup', signup);
router.post('/update/avatar', requireAuth, updateAvatar)

module.exports = router;