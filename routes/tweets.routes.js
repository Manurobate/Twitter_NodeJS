const router = require('express').Router();
const {
    tweetList,
    tweetNew,
    tweetCreate,
    tweetDelete,
    tweetEdit,
    tweetUpdate
} = require("../controllers/tweets.controller");

const {requireAuth} = require("../config/security.config");

router.get('/', tweetList)
router.get('/new', requireAuth, tweetNew)
router.get('/:tweetId', requireAuth, tweetEdit);
router.get('/delete/:tweetId', requireAuth, tweetDelete);

router.post('/', requireAuth, tweetCreate)
router.post('/:tweetId', requireAuth, tweetUpdate)

module.exports = router;