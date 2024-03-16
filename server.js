const express =require("express");   
const dotenv = require("dotenv").config();
const app = express();
const  userroutes =require('./routes/userRoutes');
const clientRouter = require('./routes/clientRouter');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// DATABASE CONNECTION
mongoose.connect("mongodb+srv://factu:factu@cluster0.cqztsth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection failed with - ", err);
  });


 app.use('/api/users',userroutes);
 app.use('/api/client', clientRouter);
// SERVER LISTENING
 const port = process.env.PORT || 5000;

 app.listen(port ,() => {
    console.log(`server running on port ${port}`);
 }); 

 