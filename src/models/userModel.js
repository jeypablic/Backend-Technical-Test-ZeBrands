const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var model = mongoose.Schema({
    rut: {
        desc: "Rut del usuario.",
        trim: true,
        type: String,
        createIndexes: true,
        unique: true,
        required: true,
    },
    nombre: {
        desc: "Nombre del usuario",
        trim: true,
        type: String
    },
    aPaterno: {
        desc: "Apellido Paterno del usuario",
        trim: true,
        type: String
    },
    aMaterno: {
        desc: "Apellido Paterno del usuario",
        trim: true,
        type: String
    },
    perfil: {
        desc: "Perfil del usuario.",
        trim: true,
        type: Number
    },
    email: {
        desc: "Email del usuario",
        lowcase: true,
        unique: true,
        require: true,
        type: String,
        validate: value => {
            if (!validator.isEmail(value)) {
               throw new Error({error: 'Email Inválido'})
            }
         }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

model.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8);
    }
    next()
});

/**
 * Metodo encargado de generar los token de autorizacion para el usuario.
 */
model.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

/**
 * Se encarga de buscar al usario por las credenciales de login
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
model.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error({ error: 'Credenciales Inválidas' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Contraseña Inválida' });
    }
    return user;
}

const UserModel = mongoose.model('usuario', model);
module.exports = UserModel;