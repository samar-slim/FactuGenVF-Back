const express = require("express");
const router = express.Router(); 
const { getAllClient  ,getClientById, createClient, deleteClient, updateClient } = require("../controllers/clientController"); 

router.post("/add", createClient);
router.get("/", getAllClient);
router.get("/:ClientId", getClientById);
router.delete("/:ClientId",deleteClient);
router.put(":ClientId",updateClient);


module.exports = router;
