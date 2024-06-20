const express = require('express');
const fs = require('fs');
const path = require('path');
const Client = require('../models/clientModel');
const User = require('../models/userModel');
const Reclamation = require('../models/reclamationModel');
const Devis = require('../models/devisModel');
const {backupHandler , backupData ,backupAllCollections} = require('../controllers/backupController');


const router = express.Router();

// Backup route
router.post('/', backupHandler);
router.post('/time', backupData);
router.post('/all', backupAllCollections);

module.exports = router;
