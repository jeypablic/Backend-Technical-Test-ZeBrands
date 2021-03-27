const mongoose = require('mongoose');

var model = mongoose.Schema({
    nombre: {
        desc: "Nombre Acción.",
        trim: true,
        type: String
    },
    codigo: {
        desc: "Código Acción",
        type: Number
    },
    sku: {
        desc: 'Sku del producto quien gatilla el tracking',
        trim: true,
        type: String
    },
});

const trackingModel = mongoose.model('tracking', model);
module.exports = trackingModel;