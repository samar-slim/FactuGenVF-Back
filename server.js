const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const dataCron = require('./cornJobs/dataJobs.js');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const seedDatabase = require('./seedData'); // Add the seed module
const userroutes = require('./routes/userRoutes');
const clientRouter = require('./routes/clientRouter');
const produitRoutes = require('./routes/produitRoute');
const factureRoute = require('./routes/factureRoute');
const devisRoute = require('./routes/devisRoute');
const imageRoutes = require('./routes/imageRoutes');
const Facture = require('./models/factureModel');
const avoirRoute = require('./routes/avoirRoute');
const categorieRoute = require('./routes/catgoryRoutes');
const reclamationRoutes = require('./routes/reclamationRoute');
const auth = require('./routes/authRoutes');
const backupRoute = require('./routes/backupRoutes');
const dashbord = require('./routes/dashbordRoutes');
const account = require('./routes/accountRoutes');
const AIRoutes = require('./routes/AIRoutes');
const template = require('./routes/templateRoutes');
let checkAuth = require('./middelewares/authMidleware');
let adminCheck = require('./middelewares/adminCheckmidleware');
let logRequest = require('./middelewares/activityMidleware');
var audit = require('express-requests-logger');
const { backupData } = require('./controllers/backupController');
const { userData } = require('./controllers/dataController');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:5173", 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200 // Autorise les cookies
}));

mongoose.Promise = global.Promise;



mongoose.connect(process.env.db_name)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection failed with - ", err);
  });
  app.post('/api/save-signature', upload.single('signature'), async (req, res) => {
    try {
      const factureId = req.query.factureId;
      const signatureFile = req.file;
  
      console.log('Facture ID:', factureId);
      console.log('Signature File:', signatureFile);
  
      if (!factureId) {
        return res.status(400).json({ error: 'Facture ID not provided' });
      }
  
      if (!signatureFile) {
        return res.status(400).json({ error: 'No signature file provided' });
      }
  
      const facture = await Facture.findById(factureId);
      if (facture) {
        facture.facture.signatureUrl = '/uploads/' + signatureFile.filename;
        await facture.save();
        console.log('Signature URL saved successfully:', facture.signatureUrl);
        res.json({ message: 'Signature URL saved successfully', signatureUrl: facture.signatureUrl });
      } else {
        res.status(404).json({ error: 'Facture not found' });
      }
    } catch (err) {
      console.error('Error updating facture with signature URL:', err);
      res.status(500).json({ error: 'Failed to update facture with signature URL' });
    }
  });
  
  // Route pour mettre à jour la facture avec l'URL de la signature
  app.put('/api/factures/:id', async (req, res) => {
    try {
      const factureId = req.params.id;
      const updatedFacture = req.body;
  
      console.log('Facture ID:', factureId);
      console.log('Updated Facture:', updatedFacture);
  
      const facture = await Facture.findByIdAndUpdate(factureId, updatedFacture, { new: true });
      if (facture) {
        console.log('Facture updated successfully:', facture);
        res.json({ message: 'Facture updated successfully', facture });
      } else {
        res.status(404).json({ error: 'Facture not found' });
      }
    } catch (err) {
      console.error('Error updating facture:', err);
      res.status(500).json({ error: 'Failed to update facture' });
    }
  });


  app.post('/api/extract-text', upload.single('file'), async (req, res) => {
    const file = req.file;
    console.log('Fichier téléchargé :', file);
  
    // Vérifiez que le fichier a été enregistré
    if (!fs.existsSync(file.path)) {
      return res.status(500).json({ error: "Fichier non enregistré" });
    }
  
    try {
      const { data: { text } } = await tesseract.recognize(file.path, 'eng');
      // Supprimez le fichier après traitement
     
      res.json({ extractedText: text });
    } catch (err) {
      console.error('Erreur lors de l\'extraction de texte:', err);
      res.status(500).json({ error: "Erreur lors de l'extraction de texte" });
    }
  });
  
app.post('/process-text', (req, res) => {
  const text = req.body.text;

  // Logique de traitement de texte (extraction d'informations clés, formatage, etc.)
  const processedData = processText(text);

  res.json(processedData);
});

async function startServer() {
  try {
    await mongoose.connect(process.env.db_name, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");


    // Seed the database
    await seedDatabase();
    console.log('Database seeding completed');

    // Routes and other middleware
    app.post('/api/extract-text', upload.single('file'), async (req, res) => {
      const file = req.file;
      console.log('Fichier téléchargé :', file);

      // Vérifiez que le fichier a été enregistré
      if (!fs.existsSync(file.path)) {
        return res.status(500).json({ error: "Fichier non enregistré" });
      }

      try {
        const { data: { text } } = await tesseract.recognize(file.path, 'eng');
        // Supprimez le fichier après traitement
        
        res.json({ extractedText: text });
      } catch (err) {
        console.error('Erreur lors de l\'extraction de texte:', err);
        res.status(500).json({ error: "Erreur lors de l'extraction de texte" });
      }
    });

    app.post('/process-text', (req, res) => {
      const text = req.body.text;

      // Logique de traitement de texte (extraction d'informations clés, formatage, etc.)
      const processedData = processText(text);

      res.json(processedData);
    });

    app.post('/generate-invoice', (req, res) => {
      const invoiceData = req.body;

      // Logique de génération de facture (création du document, rendu du modèle, etc.)
      const newInvoice = generateInvoice(invoiceData);

      res.json(newInvoice);
    });

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use('/api/auth', logRequest, auth);
    app.use('/api/backup', backupRoute);
    //app.use('/api/categories', categorieRoute);
    app.use('/api/', avoirRoute);
    app.use('/api/images', imageRoutes);
    app.use('/api/users', logRequest, userroutes);
    app.use('/api/devis', devisRoute);
    app.use('/api/facture', factureRoute);
    app.use('/api/client', clientRouter);
    app.use('/api/produits', produitRoutes);
    app.use('/api/account', checkAuth, account);
    app.use('/api/ai', AIRoutes);
    app.use('/api/admindashbord', dashbord);
    app.use('/api/reclamation', checkAuth, reclamationRoutes);
    app.use('/api/template', template);

    // cron.schedule('*/1 * * * *', dataCron);
    const collection = ["user" , "facture", "devis", "produit", "reclamation", "account", "template" , "historiqueActivite", "document"];
    cron.schedule(  process.env.backupTime, async () => {
      console.log('Cron job started');
      await backupData(collection);
      console.log('Cron job finished');
    });

    setInterval( userData, 24 * 60   *60 * 1000);


    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
  }
}


startServer();


// Mock functions for text processing and invoice generation
function processText(text) {
  // Implement your text processing logic here
  return { processedText: text };
}

function generateInvoice(invoiceData) {
  // Implement your invoice generation logic here
  return { invoiceId: 1, ...invoiceData };
}
