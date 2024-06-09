const express = require("express");
const router = express.Router(); 
const upload = require("../middelewares/upload"); // Assurez-vous que le chemin vers votre middleware est correct

const { getAllfacture,getClientFacture ,getfactureById, updatefacture, createfacture, deletefacture } = require("../controllers/factureController"); 

// Route pour ajouter un facture avec téléchargement d'image
router.post("/add", upload.single("image"), createfacture
);

// Autres routes
router.get("/", getAllfacture);
router.get("/client", getClientFacture)
router.get("/showfacture/:factureId", getfactureById);
router.put("/:factureId", updatefacture); // Corrigez le chemin de la route
router.delete("/:factureId",deletefacture);
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
  });
module.exports = router;