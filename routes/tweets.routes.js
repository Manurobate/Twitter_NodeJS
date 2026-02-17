const router = require('express').Router();
const {
    tweetList,
    tweetNew,
    tweetCreate,
    tweetDelete,
    tweetEdit,
    tweetUpdate
} = require("../controllers/tweets.controller");

router.get('/', tweetList)
router.get('/new', tweetNew)
router.get('/:tweetId', tweetEdit);

router.post('/', tweetCreate)
router.post('/:tweetId', tweetUpdate)

router.delete('/:tweetId', tweetDelete);

module.exports = router;