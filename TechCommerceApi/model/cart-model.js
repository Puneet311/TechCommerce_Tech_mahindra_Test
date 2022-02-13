const mongoose = require('mongoose')

const productSchema2 = new mongoose.Schema({
    name:{
        type:String,
    },
    imageLink:{
        type:String,
    },
    price:{
        type:Number
    },
    quantity:{
        type:String
    },
    isBought:{
        type:Boolean
    },
    details:{
        type:String
    }
});

module.exports = mongoose.model('cartProduct', productSchema2)