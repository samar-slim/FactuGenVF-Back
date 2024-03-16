const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Admin', adminSchema);