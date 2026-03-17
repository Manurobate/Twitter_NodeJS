const {
    getTweets,
    createTweet,
    deleteTweet,
    getTweet,
    updateTweet,
    getCurrentUserTweetsWithFollowing
} = require("../database/queries/tweets.queries");

exports.tweetList = async (req, res, next) => {
    try {
        const isAuthenticated = req.isAuthenticated();
        const tweets = isAuthenticated
            ? await getCurrentUserTweetsWithFollowing(req.user)
            : await getTweets();

        res.render('tweets/tweet', {
            tweets,
            isAuthenticated,
            currentUser: req.user,
            user: req.user,
            editable: true
        });
    } catch (e) {
        next(e);
    }
}

exports.tweetNew = (req, res, next) => {
    try {
        res.render('tweets/tweet-form', {tweet: {}, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch (e) {
        next(e);
    }
}

exports.tweetCreate = async (req, res) => {
    try {
        const body = req.body;
        await createTweet({...body, author: req.user._id});
        res.redirect('/tweets');
    } catch (e) {
        const errors = Object.keys(e.errors).map(key => e.errors[key].message);
        res.status(400).render('tweets/tweet-form', {
            errors,
            tweet: {},
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        });
    }
}

exports.tweetDelete = async (req, res, next) => {
    try {
        await deleteTweet(req.params.tweetId)
        res.redirect('/tweets');
    } catch (e) {
        next(e);
    }
}

exports.tweetEdit = async (req, res, next) => {
    try {
        const tweet = await getTweet(req.params.tweetId);
        res.render('tweets/tweet-form', {tweet, isAuthenticated: req.isAuthenticated(), currentUser: req.user});
    } catch (e) {
        next(e);
    }
}

exports.tweetUpdate = async (req, res) => {
    try {
        await updateTweet(req.params.tweetId, req.body);
        res.redirect('/tweets');
    } catch (e) {
        const tweet = await getTweet(req.params.tweetId);
        tweet.content = req.body.content;
        const errors = Object.keys(e.errors).map(key => e.errors[key].message);
        res.status(400).render('tweets/tweet-form', {
            errors,
            tweet: tweet,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        });
    }
}
