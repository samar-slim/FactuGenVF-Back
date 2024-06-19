const express = require("express");
const router = express.Router(); 
const upload = require("../middelewares/upload"); // Assurez-vous que le chemin vers votre middleware est correct

const { getAlldevis,getClientDevis ,getdevisById, updatedevis, createdevis, deleteDevis } = require("../controllers/devisController"); 

// Route pour ajouter un devis avec téléchargement d'image
router.post("/add", upload.single("image"), createdevis
);

// Autres routes
router.get("/", getAlldevis);
router.get("/:client", getClientDevis);
router.get("/showDevis/:devisId", getdevisById);
router.put("/:devisId", updatedevis); // Corrigez le chemin de la route
router.delete("/:devisId",deleteDevis);
module.exports = router;