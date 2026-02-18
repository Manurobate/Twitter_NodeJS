const User = require('../models/user.model');

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
