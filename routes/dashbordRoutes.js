const express = require('express');
const router = express.Router();
const {getDashbordData } = require('../controllers/dashbordController');
const { getData } = require('../controllers/dataController');

router.post("/", getDashbordData);
router.get("/", getData);
module.exports = router; 
