const express = require('express');
const fs = require('fs');
const path = require('path');
const Client = require('../models/clientModel');
const User = require('../models/userModel');
const Reclamation = require('../models/reclamationModel');
const Devis = require('../models/devisModel');


const router = express.Router();

// Backup route
router.get('/backup', async (req, res) => {
  try {
    const clients = await Client.find().exec();
    const users = await User.find().exec();
    const reclamations = await Reclamation.find().exec();
    const devis = await Devis.find().exec();

    const backupData = JSON.stringify({ clients, users, reclamations, devis }, null, 2);
    const backupPath = path.join(__dirname, '../backup', 'backup.json');

    // Ensure backup directory exists
    fs.mkdirSync(path.join(__dirname, '../backup'), { recursive: true });

    fs.writeFileSync(backupPath, backupData);
    res.status(200).json({ message: 'Backup successful', backupPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Backup failed', error });
  }
});

module.exports = router;
