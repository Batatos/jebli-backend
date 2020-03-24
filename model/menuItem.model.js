const mongoose = require('mongoose');

const menuItemSchema = mongoose.Schema({
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
    isVegan: {
        type: Boolean
    },
    price: {
        type: Number,
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
    timeToMake: {
        type: String,
        require: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu'
    }
}, {
    timsestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);