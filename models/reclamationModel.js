const mongoose= require("mongoose"); 
const { Schema } = mongoose;
// Définition du schéma pour les documents dans la base de données
const reclamation = new Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    dateCreation: { type: Date, required: true }, 
    tittle: {type: String, required: true},
    discription: { type: String, required: true }, 
  });
  module.exports = mongoose.model('Reclamation', reclamation);