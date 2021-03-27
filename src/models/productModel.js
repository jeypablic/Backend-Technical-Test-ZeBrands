const mongoose = require('mongoose');

var model = mongoose.Schema({
    sku: {
        desc: "SKU del producto.",
        trim: true,
        type: String,
        createIndexes: true,
        unique: true,
        required: true,
    },
    nombre: {
        desc: "Nombre del Producto",
        trim: true,
        require: true,
        type: String
    },
    marca: {
        desc: "Marca del Producto",
        type: String
    },
    precio: {
        desc: "Precio del Producto",
        require: true,
        type: Number
    }
});

// compile schema to model
const ProductoModel =  mongoose.model('producto', model);
module.exports =ProductoModel;