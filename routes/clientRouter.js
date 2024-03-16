const express =require("express");
const router = express.Router();
const { getAllClient} = require("../controllers/clientController");

router.get("/client", getAllClient);

module.exports = router