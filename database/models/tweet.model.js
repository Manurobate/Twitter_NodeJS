const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({
    content: {
        type: String,
        required: [true, 'Il faut saisir quelquechose !'],
        minlength: [3, 'Tweet trop court'],
        maxlength: [140, 'Tweet trop long']
    },
    author: {type: schema.Types.ObjectId, ref: 'user', required: true},
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;
