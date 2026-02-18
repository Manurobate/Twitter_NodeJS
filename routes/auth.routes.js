const router = require('express').Router();
const {loginForm, login, logout} = require('../controllers/auth.controller');

router.get('/login', loginForm);
router.get('/logout', logout);
router.post('/login', login);

module.exports = router;