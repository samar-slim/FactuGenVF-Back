const express =require("express");   
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const  userroutes =require('./routes/userRoutes');
const clientRouter = require('./routes/clientRouter');
const produitRoutes = require('./routes/produitRoute');
const reclamationRoutes = require('./routes/reclamationRoute');
const auth = require('./routes/authRoutes');
const backupRoutes = require('./routes/backupRoutes');
const dashbord = require('./routes/dashbordRoutes');
const account = require('./routes/accountRoutes');
const mongoose = require("mongoose");
var audit = require('express-requests-logger')

const AIRoutes = require('./routes/AIRoutes');


let checkAuth = require('./midleware/authMidleware');
let adminCheck = require('./midleware/adminCheckmidleware');
let logRequest = require('./midleware/activityMidleware');
mongoose.Promise = global.Promise;
// Connection URI
const uri =  'mongodb+srv://salemhellal2:fja35uRnkwRnv3rt@cluster0.ebyqq2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

// Database name
const dbName = process.env.DB_NAME;

// Collection name
const collectionName = process.env.COLLECTION_NAME;

// DATABASE CONNECTION
mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection failed with - ", err);
  });
  app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(audit());
 app.use('/api/auth', logRequest ,auth);
 app.use('/api/users',checkAuth,userroutes);
 app.use('/api/clients',checkAuth, clientRouter);
 app.use('/api/produits', checkAuth, produitRoutes);
 app.use('/api/reclamation', checkAuth, reclamationRoutes);
 app.use('/api/backup', backupRoutes);
 app.use('/api/admindashbord',checkAuth,  adminCheck ,dashbord);
app.use('/api/account', checkAuth, account);
app.use('/api/ai', AIRoutes);
 // SERVER LISTENING,
 const port = process.env.PORT || 8080;

 app.listen(port ,() => {
    console.log(`server running on port ${port}`);
 }); 

 