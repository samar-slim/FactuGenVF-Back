const mongoose = require('mongoose');
const { Schema } = mongoose;

const modeleSchema = new Schema({
    nom: { type: String, required: true },
    couleur: { type: String, required: true },
    policeTitre: { type: String, required: true },
    taillePoliceTitre: { type: Number, required: true },
    logo: { type: String, required: false },
    policeCorps: { type: String, required: true },
    taillePoliceCorps: { type: Number, required: true },
  });
  
  module.exports = mongoose.model('Modele', modeleSchema);