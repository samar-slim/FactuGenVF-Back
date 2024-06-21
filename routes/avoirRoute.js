const express = require('express');
const router = express.Router();
const Facture = require('../models/factureModel');
const Avoir = require('../models/avoirModel');

// Route pour annuler une facture
router.put('/facture/cancel/:id', async (req, res) => {
    try {
      console.log(`Tentative d'annulation de la facture avec l'ID: ${req.params.id}`);
      
      const facture = await Facture.findById(req.params.id);
      if (!facture) {
        return res.status(404).json({ message: 'Facture non trouvée' });
      }
  
      console.log(`Facture trouvée: ${facture._id}`);
  
      // Créer un nouvel avoir avec les informations de la facture annulée
      const avoir = new Avoir({
        avoir: facture.facture, // Copier les informations de la facture
        produitsSelectionnes: facture.produitsSelectionnes,
        status: 'annulé'
      });
  
      console.log(`Tentative de sauvegarde de l'avoir pour la facture: ${facture._id}`);
      await avoir.save();
  
      // Mettre à jour la facture pour indiquer qu'elle est annulée
      facture.status = 'annulé';
      await facture.save();
  
      console.log(`Facture ${facture._id} annulée avec succès et un avoir créé avec l'ID: ${avoir._id}`);
      res.status(200).json({ message: 'Facture annulée avec succès', avoir });
    } catch (error) {
      console.error('Erreur lors de l\'annulation de la facture:', error);
      res.status(500).json({ message: 'Erreur lors de l\'annulation de la facture', error });
    }
  });
  router.get('/count', async (req, res) => {
    try {
      const countAvoir = await Avoir.countDocuments();
      
      res.json({ count: countAvoir});
    } catch (error) {
      console.error('Erreur lors du comptage des devis :', error);
      res.status(500).json({ message: 'Erreur lors du comptage des devis' });
    }
  });
// Route pour récupérer la liste des avoirs
router.get('/avoirs', async (req, res) => {
  try {
    const avoirs = await Avoir.find();
    res.status(200).json(avoirs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des avoirs', error });
  }
});
router.delete('/avoirs/:avoirId', async (req,res) => {
  const id = req.params.avoirId;
  try {
    const deletedAvoir = await Avoir.findByIdAndDelete(id);
    if (!deletedAvoir) {
        return res.status(404).json({ message: 'devis non trouvé' });
    }
    return res.status(200).json({ message: 'devis supprimé avec succès' });
} catch (err) {
    console.error('Erreur lors de la suppression du devis:', err);
    return res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
}



})

module.exports = router;
