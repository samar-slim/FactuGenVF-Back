const mongoose= require("mongoose"); 
const { Schema } = mongoose;
// Définition du schéma pour les categories dans la base de données
const categorieModel = new Schema({
  Libéllé: {type: String},
  categorie_nom : {type: String},
    
  });
  module.exports = mongoose.model('Categorie', categorieModel);
  