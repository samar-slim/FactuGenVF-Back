const express = require('express');
const router = express.Router();
const {getDashbordData } = require('../controllers/dashbordController');

router.post("/", getDashbordData);

module.exports = router; 
