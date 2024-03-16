const mongoose = require('mongoose');
const documents = require('./documents');
const { Schema } = mongoose;

const devisSchema = new Schema({
    
});

const quoteModel= documents.discriminator('Devis', devisSchema);

module.exports = quoteModel;