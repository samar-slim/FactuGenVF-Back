const Data = require('../models/dataModel');
const mongoose = require('mongoose');
const { dataSchema } = require('../models/dataModel');
const User = require('../models/userModel');
const Facture = require('../models/factureModel');
const Devis = require('../models/devisModel');


const dataCron = require('../cornJobs/dataJobs');

// get lest data
const getData = async (req, res) => {
    const numberUser = await User.countDocuments();
    console.log('numberUser',numberUser);
    const numberFacture = await Facture.countDocuments();
    console.log('numberFacture',numberFacture);
    const numberDevis = await Devis.countDocuments();
    console.log('numberDevis',numberDevis);
    // calculate the total sum of money in factures
    const factures = await Facture.find();
    console.log('factures',factures);
    
    const total = factures.reduce((sum, item) => {
        // Parse the totalTTC value to a number and add to the sum
        return sum + parseFloat(item.facture.totalTTC);
      }, 0);
    console.log('total',total);
    const creationDate = new Date();
    const userPerCountry = await User.aggregate([
            {
                $group: {
                    _id: '$pays', // Group by the 'country' field
                    count: { $sum: 1 } // Count the number of users in each group
                }
            },
            {
                $sort: { count: -1 } // Optional: sort the results by count in descending order
            }
        ]);
    const data = new Data({
      numberUser,
      numberFacture,
      numberDevis,
      total ,
      creationDate,
      userPerCountry 
    });
    await data.save();
    console.log(data);
    const dataNew = await Data.find().sort({ creationDate: -1 }).limit(5);
    res.json(dataNew);
}


module.exports = { getData };