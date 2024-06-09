const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const FactureSchema = new Schema({
  facture:{
  nom_entreprise: { type: String },
  num: { type: String },
  code_postal: { type: String },
  ville: { type: String },
  email: { type: String },
  num_tel: { type: String },
  num_siret: { type: String },
  num_tva: { type: String },
  inter: { type: String },
  deleg: { type: String },
  titre: { type: String },
  numfacture: { type: String },
  remarque: { type: String },
  remise: { type: String },
  condition: { type: String },
  paiement: { type: String },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
  totalHT: { type: String },
  totalTTC: { type: String },
  imageUrl: { type: String },
  date_expiration: { type: String },
  date_emission: { type: String },
  status: {
    type: String,
    default: 'cours', // 'actif' ou 'annulé'
  },}, 
  produitsSelectionnes: [{
    total: { type: String },
    nom_article: { type: String },
    description: { type: String },
    prix: { type: String },
    prix_unitaire: { type: String },
    reference: { type: String },
    tva: { type: String },
    quantity: { type: String },
  }]
});

module.exports = mongoose.model('Facture', FactureSchema);
