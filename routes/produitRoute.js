const express = require("express");
const router = express.Router(); 
const { getAllproduit  ,getproduitById, createproduit, deleteproduit, updateproduit } = require("../controllers/produitController"); 

router.post("/add", createproduit);
router.get("/", getAllproduit);
router.get("/:produitId", getproduitById);
router.delete("/:produitId",deleteproduit);
router.put(":produitId",updateproduit);


module.exports = router;