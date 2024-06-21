const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    
    backupTime : { type: String, required: true, default: "0 0 * * *" },

});


module.exports = mongoose.model('Config', configSchema)