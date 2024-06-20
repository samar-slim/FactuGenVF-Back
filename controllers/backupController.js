const { response } = require('express');
//var backup = require('mongodb-backup'); // use require('mongodb-backup') instead
const uri =  'mongodb+srv://salemhellal2:fja35uRnkwRnv3rt@cluster0.ebyqq2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
const User = require('../models/userModel');
const Facture = require('../models/factureModel');
const Devis = require('../models/devisModel');
const Client = require('../models/clientModel');
const Account = require('../models/accountModel');
const HistoriqueActivite = require('../models/historiqueActivityModel');
const Document = require('../models/documentModel');
const Template = require('../models/templateModel');
const Reclamation = require('../models/reclamationModel');
const Categorie = require('../models/categorieModel');
const Produit = require('../models/produitModel');
const path = require('path');
const fs = require('fs');
const tar = require('tar');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const os = require('os');
const dotenv = require('dotenv');
const backup = require('../models/backupModel');


const allCollections2 = {
    "user":User,
    "facture":Facture, 
    "devis":Devis, 
    "client": Client, 
    "account":Account,
    "historiqueActivite":HistoriqueActivite,
    "document":Document,
    "template":Template,
    "reclamation":Reclamation,
    "categorie":Categorie,
    "produit":Produit
};

const allCollection = {
    user: mongoose.model('User'),
    account: mongoose.model('Account'),
    facture: mongoose.model('Facture'),
    devis: mongoose.model('Devis'),
    avoir: mongoose.model('Avoir'),
    produit: mongoose.model('Produit'),
    category: mongoose.model('Categorie'),
    reclamation: mongoose.model('Reclamation'),
    template: mongoose.model('Template'),
    historiqueActivite: mongoose.model('HistoriqueActivite'),
    //document: mongoose.model('Document'),
  };
  
  async function backupData(collections) {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'backup-'));
    const backupDir = path.join(__dirname, '../backup');
  
    try {
      const data = {};
      for (const collectionName of collections) {
        const model = allCollection[collectionName];
        if (model) {
          data[collectionName] = await model.find().lean();
        } else {
          console.warn(`Model for collection "${collectionName}" not found in allCollection.`);
        }
      }
  
      // Save the data as JSON files in the temp directory
      for (const [collectionName, documents] of Object.entries(data)) {
        const filePath = path.join(tempDir, `${collectionName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(documents, null, 2));
      }
  
      // Ensure the backup directory exists
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
  
      const backupFile = path.join(backupDir, `backup_${Date.now()}.tar.gz`);
  
      // Create a tarball of the temp directory
      await tar.c(
        {
          gzip: true,
          file: backupFile,
          cwd: tempDir,
        },
        fs.readdirSync(tempDir)
      );

      // Create a backup document
      const backup = new backup({
        nom: 'backup' + Date.now( format = "YYYY-MM-DD-HH"),
        path: backupFile,
        date: Date.now(),
        lastbackup : Date.now(),
      });
      await backup.save();
  
      console.log('Backup created successfully:', backupFile);
    } catch (error) {
      console.error('Error during backup:', error);
    } finally {
      // Clean up temporary directory
      fs.rmdirSync(tempDir, { recursive: true });
    }
  }
  
async function backupHandler(req ,res){

    const collections = req.body.collections;
    console.log("collections", collections);    

    if ( !collections ){
        return res.status(400).json({message: 'Ivalid request data : missing collections' });
    }


    
    await backupData( collections );

    return res.status(200).json({message: 'backup done' });

}


function changeBackupTime(req, res) {
  const times = {
    'day': '0 0 * * *',
    'week': '0 0 * * 0',
    'month': '0 0 1 * *',
    '3months': '0 0 1 */3 *',
  }
  const newBackupTime = req.body.newBackupTime;
  

  if (!newBackupTime) {
    return res.status(400).json({ message: 'Invalid request data: missing newBackupTime' });
  }

  updateEnv('backupTime', times[newBackupTime]);
  
  backupTime = newBackupTime;
  return res.status(200).json({ message: 'Backup time changed successfully' });
}

function updateEnv(variable, value) {

  
  const envFilePath = path.resolve('./.env');

  
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath))
  
  envConfig[variable] = value;

  // Convert the config object back to the .env format
  const updatedEnvConfig = Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n');

  // Write the updated config back to the .env file
  fs.writeFileSync(envFilePath, updatedEnvConfig);
}

// backup all the collections
//backupData(['user', 'account', 'facture', 'devis', 'avoir', 'produit', 'category', 'reclamation', 'template', 'historiqueActivite', 'document']);
function backupAllCollections(req ,res) {
  try {
    const option = req.body
    console.log("option", option);
    const times = {
      'day': '0 0 * * *',
      'week': '0 0 * * 0',
      'month': '0 0 1 * *',
      '3months': '0 0 1 */3 *',
    }

    updateEnv('backupTime', times[option.period]);
    backupData(['user', 'account', 'facture', 'devis', 'avoir', 'produit', 'category', 'reclamation', 'template', 'historiqueActivite', 'document']);
    return res.status(200).json({ message: 'Backup created successfully' });
  } catch (error) {
    console.error('Error during backup:', error);
    return res.status(500).json({ message: 'Error during backup' });
  }
}
module.exports = {backupHandler , backupData , changeBackupTime, backupAllCollections}; 