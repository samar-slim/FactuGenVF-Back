const mongoose = require('mongoose');
const User = require('./assistant');
const { Schema } = mongoose;

const artisanSchema = new Schema({
    secteurActivite: String,
});

const Artisan = User.discriminator('Artisan', artisanSchema);

module.exports = Artisan;