const mongoose = require('mongoose');
const documents = require('./documentModel');
const { Schema } = mongoose;

const factureModel = new Schema({

     idF: { type: String, required: true }
});

const Facture = documents.discriminator('Facture', factureModel);

module.exports = Facture;