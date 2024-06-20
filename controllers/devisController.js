const mongoose = require('mongoose');
const Devis = require('../models/devisModel');
const Client = require('../models/clientModel')
const shortid = require('shortid');
const createdevis = async (req, res) => {
    const {
        
        date_emission,
        date_expiration,
        inter,
        deleg,
        titre,
        numDevis,
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
        

    } = req.body;

    try {
      console.log(req.body)
        const nouvelledevis = new Devis(
           req.body

        );

       await nouvelledevis.save();
       console.log('DEVIS :: ', nouvelledevis  );
        res.status(201).json({ nouvelledevis });
    } catch (err) {
     
        res.status(500).json({ success: false, message: 'Erreur lors de la création de la devis', error: err.message });
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

const getAlldevis = async (req,res) => {
    try{
        const devis = await Devis.find()
        return res.status(200).json(devis);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};
const getClientDevis = async (req, res) => {
  try {
    console.log('Client ID:', req.params.clientId);
    const clientId = req.params.clientId;

    if (clientId) {
      // Rechercher le client par son ID
     
        // Rechercher les devis associés au client
        const devis = await Devis.find({ 'devis.clientId': clientId })
        
        console.log("Devis:", devis);

        //const devisFiltres = devis.filter(devis => devis.devis.clientId === clientId);

        // Retourner les devis filtrés
        res.json(devis);
     
    } else {
      res.status(400).json({ message: 'Aucun clientId fourni' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getdevisById =async(req,res) => {
    const id =req.params.devisId;
    
    try{
    const devis = await Devis.findById(id)

    if (devis) {
        devis.clientId = devis.devis.clientId;
        devis.produitId = devis.devis.produitId;
        devis.remarque = devis.devis.remarque;
        devis.paiement = devis.devis.paiement;
        devis.condition = devis.devis.condition;
        devis.totalTTC = devis.devis.totalTTC;
        devis.totalHT = devis.devis.totalHT;


      
       

        return res.json(devis);
    } else {
        return res.status(404).json({ error: "Devis non trouvé" });
    }
}catch (err) {
    return res.json(err);
}
}
const genererLienPartage = async (req, res) => {
    const { devisId } = req.params;
    const lienPartage = shortid.generate();
  
    try {
      // Mettre à jour le devis dans la base de données avec le lien de partage
      const devis = await Devis.findByIdAndUpdate(devisId, { lienPartage }, { new: true });
  
      // Envoyer le lien de partage en réponse
      res.status(200).json({ lienPartage: `${req.hostname}/devis/${lienPartage}` });
    } catch (error) {
      console.error('Erreur lors de la génération du lien de partage :', error);
      res.status(500).json({ message: 'Erreur lors de la génération du lien de partage' });
    }
  }
  const updatedevis = async (req, res) => {
    const id = req.params.devisId;
    const data = req.body;

    try {
        // Vérifier si le devis existe
        const existingDevis = await Devis.findById(id);
        if (!existingDevis) {
            return res.status(404).json({ error: 'Devis non trouvé' });
        }

        // Mettre à jour les champs du devis avec les nouvelles données
        existingDevis.devis.date_emission = data.devis.date_emission;
        existingDevis.devis.date_expiration = data.devis.date_expiration;
        existingDevis.devis.numDevis = data.devis.numDevis;
        existingDevis.devis.titre = data.devis.titre;
        // Mettre à jour d'autres champs si nécessaire
console.log('rr', existingDevis.devis.date_expiration)
        const updatedDevis = await existingDevis.save(existingDevis);
        return res.json(updatedDevis);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du devis' });
    }
};
const deleteDevis = async (req, res) => {
  const id = req.params.devisId;
  console.log('iddd',id)
  try {
      const deletedDevis = await Devis.findByIdAndDelete(id);
      if (!deletedDevis) {
          return res.status(404).json({ message: 'devis non trouvé' });
      }
      return res.status(200).json({ message: 'devis supprimé avec succès' });
  } catch (err) {
      console.error('Erreur lors de la suppression du devis:', err);
      return res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
};


module.exports = {getClientDevis, genererLienPartage,uploadImage, getAlldevis ,getdevisById ,createdevis ,updatedevis,deleteDevis}