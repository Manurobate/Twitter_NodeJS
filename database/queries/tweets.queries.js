const Tweet = require('../models/tweet.model');

exports.getTweets = () => {
    return Tweet.find();
}

exports.createTweet = (tweet) => {
    const newTweet = new Tweet(tweet);
    return newTweet.save();
}
exports.deleteTweet = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId);
}

exports.getTweet = (tweetId) => {
    return Tweet.findById(tweetId);
}

exports.updateTweet = (tweetId, tweet) => {
    return Tweet.findByIdAndUpdate(tweetId, {$set: {content: tweet.content}}, {runValidators: true});
}