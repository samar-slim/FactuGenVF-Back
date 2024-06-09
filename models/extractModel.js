// models/Extraction.js
const mongoose = require('mongoose');

const extractionSchema = new mongoose.Schema({
  imageData: {
    type: Buffer, // Utilisez Buffer pour stocker les données binaires de l'image
    required: true,
  },
  extractedText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Extraction = mongoose.model('Extraction', extractionSchema);

module.exports = Extraction;
