const express =require("express");   
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const  userroutes =require('./routes/userRoutes');
const clientRouter = require('./routes/clientRouter');
const produitRoutes = require('./routes/produitRoute');
const auth = require('./routes/authRoutes');
const mongoose = require("mongoose");

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
 app.use('/api/auth', auth);
 app.use('/api/users',userroutes);
 app.use('/api/clients', clientRouter);
 app.use('/api/produits', produitRoutes);

 // SERVER LISTENING
 const port = process.env.PORT || 8080;

 app.listen(port ,() => {
    console.log(`server running on port ${port}`);
 }); 

 