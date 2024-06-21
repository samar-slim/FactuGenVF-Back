const express = require("express");
const router = express.Router(); 

const { getAllClient,getClientCount,  getClientById, createClient, deleteClient, updateClient } = require("../controllers/clientController"); 

router.post("/add", createClient);
router.get("/", getAllClient);
router.get("/:clientId", getClientById);
router.get("/count", getClientCount);
router.delete("/:clientId",deleteClient);
router.put("/:id", updateClient);



module.exports = router;