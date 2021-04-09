const mongoose = require('mongoose');
const UserModel = require('../models/userModel');
const Notification = require('../utils/notification');

var model = mongoose.Schema({
    sku: {
        desc: "SKU del producto.",
        trim: true,
        type: String,
        createIndexes: true,
        unique: true,
        required: true,
    },
    name: {
        desc: "Nombre del Producto",
        trim: true,
        require: true,
        type: String
    },
    brand: {
        desc: "Marca del Producto",
        type: String
    },
    price: {
        desc: "Precio del Producto",
        require: true,
        type: Number
    },
    lastUserUpdate: {
        desc: "Usuario que actualiza",
        require: false,
        type: String
    },
    deleted: {
        desc: "Eliminación Lógica",
        require: true,
        default: false,
        type: Boolean
    }
},{
    timestamps: true
});

model.post('findOneAndUpdate', async function() {   
    const usrAdm = await UserModel.find({perfil:1, email:{$ne : this._update.$set.lastUserUpdate }}).exec();
    usrAdm.forEach(u => {
        
        let message = `Sr. ${u.name},\n The ${this._update.$set.lastUserUpdate} has updated product SKU ${this._conditions.sku}, the fields updated was ${this._update.$set}`;
        console.log(message);
        Notification.send(u.email, message, 'Update Product');
    });
});

const ProductModel =  mongoose.model('product', model);
module.exports =ProductModel;