const mongoose= require("mongoose"); 
const { Schema } = mongoose;
// Définition du schéma pour les documents dans la base de données
const documents = new Schema({
    idImport: { type: String, required: true }, 
    dateImport: { type: Date, required: true }, 
    numDoc: { type: String, required: true }, 
    dateCreation: { type: Date, required: true }, 
    dateEcheance: { type: Date, required: false }, 
    montantHT: { type: Number, required: true },
    montantTTC: { type: Number, required: true }, 
    montantTVA: { type: Number, required: false }, 
    remise: { type: Number, required: false }, 
    statut: { type: String, required: true, enum: ['en_cours', 'validé', 'payé','confirmé'] }, 
    commentaire: { type: String, required: false },
    modePaiement: { type: String, required: false }, 
    datePaiement: { type: Date, required: false }, 
    adresse: { type: String, required: false }, 
    source: { type: String, required: false }, 
  });
  module.exports = mongoose.model('Documents', documents);