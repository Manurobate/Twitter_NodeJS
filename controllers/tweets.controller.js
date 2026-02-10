const {getTweets, createTweet, deleteTweet} = require("../database/queries/tweets.queries");

exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await getTweets();
        res.render('tweets/tweet', {tweets});
    } catch (e) {
        next(e);
    }
}

exports.tweetNew = async (req, res, next) => {
    try {
        res.render('tweets/tweet-form');
    } catch (e) {
        next(e);
    }
}

exports.tweetCreate = async (req, res) => {
    try {
        await createTweet(req.body);
        res.redirect('/tweets');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message);
        res.status(400).render('tweets/tweet-form', {errors});
    }
}

exports.tweetDelete = async (req, res, next) => {
    try {
        await deleteTweet(req.params.tweetId)
        const tweets = await getTweets();
        res.render('tweets/tweet-list', {tweets});
    } catch (e) {
        next(e);
    }
}