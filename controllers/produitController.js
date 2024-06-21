const Produit = require("../models/produitModel");

const Facture = require("../models/factureModel");
const Devis = require("../models/devisModel");

const createproduit = async(req, res) => {
    const { imageUrl, nom_article, description, prix, prix_unitaire, categorieId, reference, tva, type_unité, type } = req.body;
    try {
        console.log(req.body)
        const newProduit = new Produit({
            nom_article,
            description,
            prix,
            prix_unitaire,
            tva,

            reference,
            type_unité,
            imageUrl,
            type ,
            categorieId,
        });
        await newProduit.save();
        console.log('prod',newProduit)
        return res.status(201).json({ newProduit });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};
const getProduitsParType = async (req, res) => {
    const type = req.params.type;
    try {
        const produits = await Produit.find({ type });
        if (produits.length === 0) {
            return res.status(404).json({ message: `Aucun produit trouvé pour le type: ${type}` });
        }
        return res.status(200).json(produits);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


const getAllproduit = async (req,res) => {
    try{
        const produits = await Produit.find()
        return res.status(200).json(produits);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};
const getProduitById = async (req, res) => {
    const id = req.params.produitId;
    try {
        const produit = await Produit.findById(id);
        if (!produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        console.log('prod :::', produit);
        return res.json(produit);
    } catch (err) { 
        console.error('Erreur lors de la récupération du produit :', err);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du produit" });
    }
};

const deleteproduit = async (req, res) => {
    const produitId = req.params.produitId;
  
    try {
      // Vérifier si le produit existe avant de procéder aux autres vérifications
      
  
      // Vérifier si le produit est utilisé dans des factures
      const facturesCount = await Facture.countDocuments({ 'lignes.produitId': produitId });
      if (facturesCount > 0) {
        return res.status(400).json({ message: "Le produit ne peut pas être supprimé car il est utilisé dans des factures." });
      }
  
      // Vérifier si le produit est utilisé dans des devis
      const devisCount = await Devis.countDocuments({ 'lignes.produitId': produitId });
      if (devisCount > 0) {
        return res.status(400).json({ message: "Le produit ne peut pas être supprimé car il est utilisé dans des devis." });
      }
  
      // Si le produit n'est pas utilisé dans des factures ou des devis, le supprimer
      await Produit.findByIdAndDelete(produitId);
  
      return res.status(200).json({ message: "Produit supprimé avec succès" });
    } catch (err) {
      console.error('Erreur lors de la suppression du produit:', err);
      return res.status(500).json({ message: "Erreur lors de la suppression du produit" });
    }
  };

const updateproduit= async(req, res) => {
    const id = req.params.produitId;
    const data = req.body;
    try {
        const updateproduit = await Produit.findByIdAndUpdate(id, data, { new: true });
        return res.json(updateproduit);
    } catch (err) {
        return res.json(err);
    }
};




module.exports = {getAllproduit ,getProduitsParType ,getProduitById ,createproduit ,deleteproduit,updateproduit};