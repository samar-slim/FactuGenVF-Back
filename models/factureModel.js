const mongoose = require("mongoose");
const { Schema } = mongoose;

const FactureSchema = new Schema(
  { facture:{
    signatureUrl:{ type: String },
  inter: { type: String },
  deleg: { type: String },
  titre: { type: String },
  numfacture: { type: String },
  remarque: { type: String },
  remise: { type: Number },
  condition: { type: String },
  paiement: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  clientId: { type: Schema.Types.ObjectId, ref: 'client' },
  produitId: { type: Schema.Types.ObjectId, ref: 'Produit' },
  totalHT: { type: Number },
  totalTTC: { type: Number },
  imageUrl: { type: String },
  date_expiration: { type: Date },
  date_emission: { type: Date },
  status: {
    type: String,
    default: 'cours', // 'actif' ou 'annulé'
  }},
  produitsSelectionnes: [{
    total: { type: Number },
    nom_article: { type: String },
    description: { type: String },
    prix: { type: Number },
    prix_unitaire: { type: Number },
    reference: { type: String },
    tva: { type: Number },
    quantity: { type: Number },
  }]
});

module.exports = mongoose.model('Facture', FactureSchema);