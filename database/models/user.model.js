const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    username: {
        type: String,
        unique: [true, 'Username déjà utilisé'],
        required: [true, 'Veuillez saisir un nom d\'utilisateur'],
        trim: true
    },
    local: {
        email: {
            type: String,
            unique: [true, 'Email déjà utilisé'],
            required: [true, 'Veuillez saisir un email'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Veuillez saisir un mot de passe'],
            trim: true,
            validate: {
                validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/.test(value),
                message: 'Le mot de passe doit contenir au moins 12 caracteres, une majuscule, une minuscule et un chiffre'
            }
        }
    }
});

userSchema.statics.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;
