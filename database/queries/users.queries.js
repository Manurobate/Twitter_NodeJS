const User = require('../models/user.model');

const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

exports.createUser = async (body) => {
    try {
        const newUser = new User({
            username: body.username,
            local: {
                email: body.email,
                password: body.password
            }
        });

        await newUser.validate();

        newUser.local.password = await User.hashPassword(body.password);

        return newUser.save();
    } catch (e) {
        throw e;
    }
}

exports.findUserByEmail = (email) => {
    return User.findOne({'local.email': email});
}

exports.findUserById = (id) => {
    return User.findById(id);
}

exports.findUserByUsername = (username) => {
    return User.findOne({'username': username});
}

exports.searchUsers = (search) => {
    const escapedSearch = escapeRegex(search);

    return User.find({username: {$regex: escapedSearch, $options: 'i'}});
}
