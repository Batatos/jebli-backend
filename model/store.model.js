const mongoose = require('mongoose');
const menuModel = require('../model/menu.model');

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6
    },
    description: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    working_hours: {
        type: String,
        require: true
    },
    working_days: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    logo: {
         data: Buffer,
         contentType: String 
    },
    menu: [menuModel]
}, {
    timsestamps: true
});

module.exports = mongoose.model('Store', storeSchema);