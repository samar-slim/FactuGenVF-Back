const express = require("express");
const router = express.Router(); 

const { getAllcategorie,  getcategorieById, createcategorie, deletecategorie, updatecategorie } = require("../controllers/categorieController"); 

router.post("/add", createcategorie);
router.get("/", getAllcategorie);
router.get("/:categorieId", getcategorieById );

router.delete("/:categorieId",deletecategorie);
router.put('/:id',updatecategorie );



module.exports = router;