const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const devisModel = new Schema({
  devis: {
    inter: { type: String, default: '' },
    deleg: { type: String, default: '' },
    titre: { type: String, default: '' },
    numDevis: { type: String, default: '' },
    remarque: { type: String, default: '' },
    remise: { type: Number, default: 0 },
    condition: { type: String, default: '' },
    paiement: { type: String, default: '' },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' },
    totalHT: { type: Number, default: 0 },
    totalTTC: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
    date_expiration: { type: Date },
    date_emission: { type: Date },
    status: { type: String, enum: ['signé', 'non_signé'], default: 'non_signé' }
  },
  produitsSelectionnes: [{
    total: { type: Number, default: 0 },
    nom_article: { type: String, default: '' },
    description: { type: String, default: '' },
    prix: { type: Number, default: 0 },
    prix_unitaire: { type: Number, default: 0 },
    reference: { type: String, default: '' },
    tva: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('Devis', devisModel);