const Data = require('../models/dataModel');
const mongoose = require('mongoose');

const cron = require('node-cron');


//corn job for data
const dataCron =  async () => {
    // calculate the number of users
    const numberUser = await User.countDocuments();
    const numberFacture = await Facture.countDocuments();
    const numberDevis = await Devis.countDocuments();
    // calculate the total sum of money in factures
    const factures = await Facture.find();
    let total = 0;
    factures.forEach(facture => {
      total += facture.total;
    });
    const creationDate = new Date();
    const userPerCountry = await User.aggregate([
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      }
    ]);
    const data = new Data({
      numberUser,
      numberFacture,
      numberDevis,
      total,
      creationDate,
      userPerCountry
    });
    await data.save();
    console.log(data);

  }


module.exports = { dataCron } //exporting dataCron

// how to use this cron job in server.js 
// app.use('/api/data', dataRoute);