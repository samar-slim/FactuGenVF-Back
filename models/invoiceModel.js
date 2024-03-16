const mongoose = require('mongoose');
const documents = require('./documents');
const { Schema } = mongoose;

const invoiceModel = new Schema({
    
});

const Facture = documents.discriminator('Facture', invoiceModel);

module.exports = Facture;