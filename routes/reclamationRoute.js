const express = require("express");
const router = express.Router(); 
const { getAllReclamation  ,getReclamationById, createReclamation, deleteReclamation, updateReclamation } = require("../controllers/reclamationController"); 

router.post("/add", createReclamation);
router.get("/", getAllReclamation);
router.get("/:ReclamationId", getReclamationById);
router.delete("/:ReclamationId",deleteReclamation);
router.put(":ReclamationId",updateReclamation);


module.exports = router;
