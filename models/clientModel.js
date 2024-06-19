const mongoose= require("mongoose"); 
const { Schema } = mongoose;

const Client = new Schema({
  type: {
    type: String,
    enum: ['particulier', 'professionnel'],
   
  },
 // Champs spécifiques pour les clients  particulier
 civilite:String,
  name: String,
  prenom:String,  
  adresse:String,
  suite_adresse:String,
  pays:String,
  email: String,
  téléphone: String,
  // Champs spécifiques pour les clients professionel
  nom_societe: String,
  siret: String,
  tva: String,
  contact: String,
  password: String,
  type: { type: String, enum: ["particulier", "professionnel"], default: 'particulier'  } 

  });
  module.exports = mongoose.model('client', Client);