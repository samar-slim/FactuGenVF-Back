const mongoose = require('mongoose');
const { Schema } = mongoose;

const activiteSchema = new Schema({
  date: { type: Date, required: true }, // Date et heure de l'activité
  utilisateur: { type: String, required: true }, // Nom d'utilisateur ayant effectué l'action (peut être une ID unique)
  action: { type: String, required: true }, // Description de l'action réalisée (création, modification, suppression, etc.)
  cible: { type: String, required: true }, // Elément concerné par l'activité (nom de la table, ID d'un document, etc.)
  details: { type: Object, required: false }, // Détails optionnels de l'activité (données modifiées, valeurs précédentes, etc.)
  source: { type: String, required: false }, // Source de l'activité (interface web, API, tâche planifiée, etc.)
});

module.exports = mongoose.model('HistoriqueActivite', activiteSchema);