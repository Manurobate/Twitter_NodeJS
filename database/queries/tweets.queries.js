const Tweet = require('../models/tweet.model');

exports.getTweets = () => {
    return Tweet.find().populate('author', 'username avatar');
}

exports.createTweet = (tweet) => {
    const newTweet = new Tweet(tweet);
    return newTweet.save();
}
exports.deleteTweet = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId);
}

exports.getTweet = (tweetId) => {
    return Tweet.findById(tweetId).populate('author', 'username avatar');
}

exports.updateTweet = (tweetId, tweet) => {
    return Tweet.findByIdAndUpdate(tweetId, {$set: {content: tweet.content}}, {runValidators: true});
}

exports.getCurrentUserTweetsWithFollowing = (user) => {
    return Tweet.find({author: {$in: [...user.following, user._id]}})
        .populate('author', 'username avatar');
}

exports.getUserTweetsFromUserId = (authorId) => {
    return Tweet.find({author: authorId}).populate('author', 'username avatar');
}
