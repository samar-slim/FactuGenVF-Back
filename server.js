const express =require("express");
const dotenv = require("dotenv").config();
const app = express();
const  routes =require('./routes/userRoutes');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// DATABASE CONNECTION
mongoose.connect( "mongodb+srv://factu:factu@cluster0.cqztsth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
    console.log("DB connection failed with - ", err);
});

 app.use('/api',routes);
// SERVER LISTENING
 const port = process.env.PORT || 5000;

 app.listen(port ,() => {
    console.log(`server running on port ${port}`);
 }); 

 