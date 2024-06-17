
const Client = require("../models/clientModel");
const nodemailer = require('nodemailer')

const createClient = async(req,res) => {
    const {  type, civilite,name, prenom,adresse,suite_adresse,pays,email, téléphone,nom_societe,siret, tva,contact } = req.body;
   console.log('aaaaa')
    try{
       const  password = generateStrongPassword(8);
       console.log('pass',password);
         const newClient = new Client({
            type,
            civilite ,
            name,
            prenom,
            adresse,
            suite_adresse,
            pays,
            email,
            téléphone,
           
            nom_societe,
            siret,
            tva,
            contact,
            password : password  }
         )        
         
         await newClient.save();
         const mailOptions = {
            from: 'mahboulirahma0@gmail.com',
            to: newClient.email,
            subject: "Invitation",
            html: `
              <p>${newClient.password}</p>
          
            
              `
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.json({ error: "An error occurred while sending the email" });
            } else {
              console.log('Email sent: ' + info.response);
              return res.json({ msg: 'The invitation has been sent by email' });
            }
          });
      
          console.log('clienttt',newClient);
         return res.status(201).json({newClient});
        
    }
    catch(err){
        return res.status(500).json({ success: false, message: err.message });
    }
};
const generateStrongPassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  };
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mahboulirahma0@gmail.com',
      pass: 'tdoszfkwzphjrmmo'
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

const getAllClient = async (req,res) => {
    try{
        const Clients = await Client.find()
        return res.status(200).json(Clients);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};


const getClientById = async (req,res) => {
    const id = req.params.ClientId;
    console.log('clientt',id)
   
    try{
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: "client non trouvé" });
        }
        
        return res.json(client);
    } catch (err) { 
        console.error('Erreur lors de la récupération du produit :', err);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du produit" });
    }
};
const deleteClient = async(req,res) => {
    const id = req.params.clientId ;
    try{
        const  deleteclient = await Client.findByIdAndDelete(id);
        return res.json(deleteclient);
    }catch(err){
        return res.json(err)
    }
};
const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
          return res.status(404).json({ message: 'Client not found' });
        }
        res.json(updatedClient);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    };



module.exports = {generateStrongPassword,transporter ,getAllClient ,getClientById ,createClient ,deleteClient,updateClient};