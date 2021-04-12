const mongoose = require('mongoose');

var model = mongoose.Schema({
    name: {
        desc: "Name Action",
        trim: true,
        type: String
    },
    code: {
        desc: "Code Action",
        type: Number
    },
    sku: {
        desc: 'Product sku who triggers the tracking',
        trim: true,
        type: String
    },
});

const trackingModel = mongoose.model('tracking', model);
module.exports = trackingModel;