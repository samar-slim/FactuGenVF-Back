const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true, unique: true },
  pays: {type: String, required: false},
  ville: {type: String, required: false},
  adresse: {type: String, required: false},
  contact:{type: String, required: false},
  type: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);