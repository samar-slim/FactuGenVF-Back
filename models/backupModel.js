const mongoose = require('mongoose');


const backup = new mongoose.Schema({
    nom: { type: String, required: true },
    path: { type: String, required: true },
    date: { type: Date, default: Date.now },
    lastbackup : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Backup', backup);
