const mongoose = require('mongoose');

const pictureScema = new mongoose.Schema({
    id: {
        type: Number,
        required:true
    },
    picture: {
        type:String,
        required:true
    },
    order: {
        type:Number,
        required:true
    },
    message: {
        type:String,
        required:false
    },
    pictureSmall: {
        type:String,
        required:false
    },
    pictureMedium: {
        type:String,
        required:false
    },
    pictureStored: {
        type:String,
        required:false
    },
    timestamp: {
        type:Number,
        required:false
    }
});

//passing table name and schema 
const Pictures = mongoose.model("pictures", pictureScema);
module.exports = Pictures;