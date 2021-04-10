const mongoose = require('mongoose');

var model = mongoose.Schema({
    name: {
        desc: "Nombre Acción.",
        trim: true,
        type: String
    },
    code: {
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