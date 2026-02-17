const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    username: {
        type: String,
        required: [true, 'Veuillez saisir un nom d\'utilisateur']
    },
    local: {
        email: {
            type: String,
            required: [true, 'Veuillez saisir un email'],
        },
        password: {
            type: String,
            required: [true, 'Veuillez saisir un mot de passe'],
        }
    }
});

userSchema.statics.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

const User = mongoose.model('user', userSchema);

module.exports = User;
