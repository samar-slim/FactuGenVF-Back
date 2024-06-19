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
    app.use('/api/admindashbord', checkAuth, adminCheck, dashbord);
    app.use('/api/reclamation', checkAuth, reclamationRoutes);
    app.use('/api/template', template);

    // cron.schedule('*/1 * * * *', dataCron);
    const collection = ["user" ]//, "facture", "devis", "produit", "reclamation", "account", "template" , "historiqueActivite", "document"];
    cron.schedule(  process.env.backupTime, async () => {
      console.log('Cron job started');
      await backupData(collection);
      console.log('Cron job finished');
    });

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
