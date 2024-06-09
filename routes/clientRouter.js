const express = require("express");
const router = express.Router(); 
const clientController = require('../controllers/clientController');
const { getAllClient,  getClientById, createClient, deleteClient, updateClient } = require("../controllers/clientController"); 

router.post("/add", createClient);
router.get("/", getAllClient);
router.get("/:ClientId", getClientById);

router.delete("/:clientId",deleteClient);
router.put('/:id', clientController.updateClient);



module.exports = router;