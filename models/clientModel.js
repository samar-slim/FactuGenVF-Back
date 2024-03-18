const mongoose= require("mongoose"); 
const { Schema } = mongoose;

const client = new Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true, unique: true },
    pays: { type: String, required: false },
    ville: {type: String, required: false},
    adresse: {type: String, required: false},
    contact: {type: String, required: false},
    

  });
  module.exports = mongoose.model('client', client);