const mongoose = require('mongoose');

const { Schema,Types } = mongoose;

  const AvoirSchema = new Schema({
    avoir: {
      nom_entreprise: String,
      num: String,
      code_postal: String,
      ville: String,
      email: String,
      num_tel: String,
      num_siret: String,
      num_tva: String,
      inter: String,
      deleg: String,
      titre: String,
      numfacture: String,
      clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
      produitId: { type: Schema.Types.ObjectId, ref: 'Produit' },
      imageUrl: String,
      date_expiration: String,
      date_emission: String
    },
    status: { type: String, default: 'annulé' },
    produitsSelectionnes:[{
        total: { type: String }, 
       nom_article: { type: String },
       description: { type: String }, 
       prix: { type: String },
       prix_unitaire: { type: String },
       reference: { type: String },
       tva:{ type: String },
       quantity:{ type: String },
       
       
     }  ]
  });
  


module.exports = mongoose.model('Avoir', AvoirSchema);
