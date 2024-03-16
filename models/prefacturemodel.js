const mongoose = require('mongoose');
const documents = require('./documents');
const { Schema } = mongoose;

const prefactureSchema = new Schema({
   
});

const Prefacture = documents.discriminator('Preacture', prefactureSchema);

module.exports = Prefacture;