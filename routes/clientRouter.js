const express = require("express");
const router = express.Router(); 

const { getAllClient,  getClientById, createClient, deleteClient, updateClient } = require("../controllers/clientController"); 

router.post("/add", createClient);
router.get("/", getAllClient);
router.get("/:ClientId", getClientById);

router.delete("/:clientId",deleteClient);
router.put("/:id", updateClient);



module.exports = router;