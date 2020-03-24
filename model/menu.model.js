const mongoose = require('mongoose');
const menuItem = require('../model/menuItem.model');
const storeModel = require('../model/store.model');

const menuSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 6
    },
    logo: {
         data: Buffer,
         contentType: String 
    },
    menuItemList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuItem'}],
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store'
    }
}, {
    timsestamps: true
});

module.exports = menuSchema;