const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const templateSchema = new Schema({
   
    name: {
        type: String,
        required: true,
    },
    FileName: {
        type: String,
        required: true,
    },
    imageUrl : {
        type: String,
        required: false,
    },
    textColor : {
        type: String,
        required: true,
    }, 
    headerColor : { 
        type: String,
        required: true,
    },
    bodyColor : {
        type: String,
        required: true,
    },
    footerColor : {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Template', templateSchema)