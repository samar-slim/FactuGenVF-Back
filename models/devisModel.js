const mongoose = require('mongoose');
const documents = require('./documentModel');
const { Schema } = mongoose;

const devisSchema = new Schema({
    
});

const devisModel= documents.discriminator('Devis', devisSchema);

module.exports = devisModel;