const User = require('../models/user.model');

exports.createUser = async (body) => {
    try {

        const hashedPassword = await User.hashPassword(body.password);

        const newUser = new User({
            username: body.username,
            local: {
                email: body.email,
                password: hashedPassword
            }
        });
        return newUser.save();
    } catch (e) {
        throw e;
    }

}