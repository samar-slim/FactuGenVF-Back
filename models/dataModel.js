const mongoose = require('mongoose');
const { Schema } = mongoose; 


const Data = new Schema({
    numberUser: { type: Number, required: true },
    numberFacture: { type: Number, required: true },
    numberDevis: { type: Number, required: true },
    total: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    userPerCountry: { type: Object, required: true },
});

module.exports = mongoose.model('Data', Data)