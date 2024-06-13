const express = require("express");
const router = express.Router();
const upload = require('../middelewares/upload'); 
const { getAllcategorie  ,getcategorieById , createcategorie, deletecategorie, updatecategorie } = require("../controllers/categorieController"); 

router.post("/add", upload.single('image'), createcategorie);
router.get("/", getAllcategorie);
router.get("/:categorieId",getcategorieById);
router.delete("/:categorieId",deletecategorie);
router.put(":categorieId",updatecategorie);


module.exports = router;