const mongoose= require("mongoose"); 
const { Schema } = mongoose;

const productModel = new Schema({
    nom: { type: String, required: true }, 
  description: { type: String, required: true }, 
  prix: { type: Number, required: true }, 
  image: { type: String, required: true }, 
  icone: { type: String, required: false }, 
  service: { type: String, required: false }, 
  });
  module.exports = mongoose.model('Produit', productModel);