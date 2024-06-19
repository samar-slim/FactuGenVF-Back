const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  pays: {type: String, required: false},
  ville: {type: String, required: false},
  adresse: {type: String, required: false},
  contact:{type: String, required: false},
  type: {type: String, required: true},
  nomEntreprise: { type: String, required: false },
  emailEntreprise: { type: String, required: false },
  telEntreprise: { type: String, required: false },
  adrEntreprise: { type: String, required: false },
  paysEntreprise: { type: String, required: false },
  siretEntreprise: { type: String, required: false },
  tvaEntreprise: { type: String, required: false },

  nomEntreprise: {type: String, required: false},
  emailEntreprise:  {type: String, required: false},
  telEntreprise:  {type: String, required: false},
  adrEntreprise:  {type: String, required: false},
  paysEntreprise: {type: String, required: false},
  siretEntreprise:  {type: String, required: false},
  tvaEntreprise:  {type: String, required: false},
});

module.exports = mongoose.model('User', userSchema);