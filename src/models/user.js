const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var model = mongoose.Schema({
    rut: {
        desc: "User rut.",
        trim: true,
        type: String,
        createIndexes: true,
        unique: true,
        required: true,
    },
    name: {
        desc: "User name",
        trim: true,
        type: String,
        required: true
    },
    lastName: {
        desc: "User last name",
        trim: true,
        type: String
    },
    profile: {
        desc: "User profile.",
        trim: true,
        type: Number,
        required: true
    },
    email: {
        desc: "User Email",
        lowcase: true,
        unique: true,
        require: true,
        type: String,
        validate: value => {
            if (!validator.isEmail(value)) {
               throw new Error({error: 'Invalid Email'})
            }
         }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    lastUserUpdate: {
        desc: "User to Update",
        require: false,
        type: String
    },
    deleted: {
        desc: "Logic Delete",
        require: true,
        default: false,
        type: Boolean
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
});

model.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

/**
 * Method in charge of generating authorization tokens for the user.
 */
model.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

/**
 * It is responsible for searching the user by the login credentials
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
model.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error({ message: 'Invalid Credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ message: 'Invalid Password' });
    }
    return user;
}

const UserModel = mongoose.model('user', model);
module.exports = UserModel;