const mongoose = require("mongoose");
const { Schema } = mongoose;

const Produit = new Schema({
  nom_article: { type: String },
  description: { type: String },
  prix: { type: String },
  prix_unitaire: { type: String },
  reference: { type: String },
  tva: { type: String },
  categorieId:  {type:mongoose.Schema.Types.ObjectId,ref:'Categorie'}, 
  type_unité: { type: String },
  imageUrl: { type: String },
  type: { type: String, enum: ['produit', 'mainoeuvre', 'traveaux'], default: 'produit' } // Ajout du champ type
});

module.exports = mongoose.model('Produit', Produit);
