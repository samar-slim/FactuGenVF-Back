const mongoose= require("mongoose"); 
const { Schema } = mongoose;
// Définition du schéma pour les sousCategories dans la base de données
const sousCategorie = new Schema({
    nom: { type: String, required: true }, 
  description: { type: String, required: true }, 
  image: { type: String, required: true },
  icone: { type: String, required: false }, 
    
  });
  module.exports = mongoose.model('SousCategorie', sousCategorie);