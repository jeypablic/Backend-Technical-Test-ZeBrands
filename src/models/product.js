const mongoose = require('mongoose');
const UserModel = require('./user');
const Notification = require('../utils/notification');

var model = mongoose.Schema({
    sku: {
        desc: "SKU of the product.",
        trim: true,
        type: String,
        createIndexes: true,
        unique: true,
        required: true,
    },
    name: {
        desc: "Name of the product",
        trim: true,
        require: true,
        type: String
    },
    brand: {
        desc: "Brand of the product",
        type: String
    },
    price: {
        desc: "Price of the product",
        require: true,
        type: Number
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
    }
},{
    timestamps: true
});

model.post('findOneAndUpdate', async function() {   
    let literalValues;  
    const valuesUpdate = this._update.$set;
    Object.keys(valuesUpdate).forEach(function(key) {
        literalValues += literalValues? '\n,' : '';
        literalValues += key + ' : ' + valuesUpdate[key];
    });

    const usrAdm = await UserModel.find({profile:1, email:{$ne : valuesUpdate.lastUserUpdate }}).exec();
    usrAdm.forEach(u => {        
        let message = `Sr. ${u.nombre},\n The ${valuesUpdate.lastUserUpdate} has updated product SKU ${this._conditions.sku}, the fields updated was \n\n ${literalValues}`;
        Notification.send(u.email, message, 'Update Product');
    });
});

const ProductModel =  mongoose.model('product', model);
module.exports = ProductModel;