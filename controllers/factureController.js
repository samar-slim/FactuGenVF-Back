const mongoose = require('mongoose');
const Facture = require('../models/factureModel');
const Client =require('../models/clientModel')
const shortid = require('shortid');
const createfacture = async (req, res) => {
    const {
        
        inter,
        deleg,
        titre,
        numfacture,
        description,
        clientId, 
        produitId,
        total,
        totalHt,
        remise,
        totalTTC,
        remarque,
        condition,
        paiement,
        nom_article,
        prix,
        prix_unitaire,
        reference,
        userId,
        tva,
        quantity,
        imageUrl,
        status, 
        date_expiration,
        date_emission,
        

    } = req.body;

    try {
      console.log(req.body)
        const nouvellefacture = new Facture(req.body);

       await nouvellefacture.save();
       console.log('facture :: ', nouvellefacture);
        res.status(201).json(nouvellefacture); // Renvoyez l'objet facture créé directement
    } catch (err) {
     
        res.status(500).json({ success: false, message: 'Erreur lors de la création de la facture', error: err.message });
    }
};
async function uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const newImage = new Image({
        fileName: req.file.filename,
        imageUrl: req.file.path,
      });
  
      const savedImage = await newImage.save();
  
      res.status(200).json(savedImage);
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  const getClientFacture = async (req, res) => {
    try {
      const clientId = req.params.clientId;
      console.log('Client ID:', clientId);
  
      if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).json({ message: 'Invalid client ID' });
      }
  
      const clientFacture = await Facture.aggregate([
        { $match: { clientId: new mongoose.Types.ObjectId(clientId) } },
        // Ajoutez d'autres étapes de l'agrégation si nécessaire
      ]);
  
      console.log({ x: clientFacture });
  
      if (clientFacture.length === 0) {
        return res.status(404).json({ message: 'No quotes found for this client' });
      }
  
      res.json(clientFacture);
    } catch (error) {
      console.error('Erreur lors de la récupération des devis associés au client :', error.message);
      res.status(500).json({ message: 'Erreur lors de la récupération des devis' });
    }
  };
  
const getAllfacture = async (req,res) => {
    try{
        const facture = await Facture.find()
        return res.status(200).json(facture);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};


const getfactureById =async(req,res) => {
    const id =req.params.factureId;
    
    try{
    const facture = await Facture.findById(id)
    console.log(facture)

    if (facture) {
        facture.clientId = facture.facture.clientId;
        facture.produitId = facture.facture.produitId;
        facture.remarque = facture.facture.remarque;
        facture.paiement = facture.facture.paiement;
        facture.condition = facture.facture.condition;

      
       

        return res.json(facture);
    } else {
        return res.status(404).json({ error: "facture non trouvé" });
    }
}catch (err) {
    return res.json(err);
}
}
const genererLienPartage = async (req, res) => {
    const { factureId } = req.params;
    const lienPartage = shortid.generate();
  
    try {
      // Mettre à jour le facture dans la base de données avec le lien de partage
      const facture = await Facture.findByIdAndUpdate(factureId, { lienPartage }, { new: true });
  
      // Envoyer le lien de partage en réponse
      res.status(200).json({ lienPartage: `${req.hostname}/facture/${lienPartage}` });
    } catch (error) {
      console.error('Erreur lors de la génération du lien de partage :', error);
      res.status(500).json({ message: 'Erreur lors de la génération du lien de partage' });
    }
  }

const updatefacture = async (req, res) => {
    const id = req.params.factureId;
    const data = req.body;
    try {
        const updatefacture = await Facture.findByIdAndUpdate(id, data, { new: true });
        return res.json(updatefacture);
    } catch (err) {
        return res.json(err);
    }
};
const deletefacture = async (req, res) => {
  const id = req.params.factureId;
  console.log('iddd',id)
  try {
      const deletedfacture = await Facture.findByIdAndDelete(id);
      if (!deletedfacture) {
          return res.status(404).json({ message: 'facture non trouvé' });
      }
      return res.status(200).json({ message: 'facture supprimé avec succès' });
  } catch (err) {
      console.error('Erreur lors de la suppression du facture:', err);
      return res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
};


module.exports = {getClientFacture,genererLienPartage,uploadImage, getAllfacture ,getfactureById ,createfacture ,updatefacture,deletefacture}