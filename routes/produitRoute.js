const express = require("express");
const router = express.Router();
const upload = require('../middelewares/upload'); 
const { getAllproduit ,getProduitsParType,
    getProduitById , createproduit, deleteproduit, updateproduit } = require("../controllers/produitController"); 

router.post("/add", upload.single('image'), createproduit);
router.get("/", getAllproduit);
router.get("/:produitId",getProduitById);
router.delete("/:produitId",deleteproduit);
router.put(":produitId",updateproduit);
router.get("/type/:type", getProduitsParType);

module.exports = router;