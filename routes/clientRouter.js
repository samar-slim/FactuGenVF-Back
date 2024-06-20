const express = require("express");
const router = express.Router(); 

const { getAllClient,  getClientById, createClient, deleteClient, updateClient, getClientByEmail } = require("../controllers/clientController"); 

router.post("/add", createClient);
router.get("/", getAllClient);
router.get("/:clientId", getClientById);
router.get("/email/:email",getClientByEmail);
router.delete("/:clientId",deleteClient);
router.put("/:id", updateClient);



module.exports = router;