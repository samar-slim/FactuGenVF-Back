const Client = require("../models/clientModel");
const Facture = require("../models/factureModel");
const Devis = require("../models/devisModel")
const nodemailer = require('nodemailer')
const User = require("../models/userModel"); // Make sure to require your User model
const Account = require("../models/accountModel"); // Make sure to require your Account model

const { signUp } = require("./authController");

const createClient = async (req, res) => {
  const { type, civilite, name, prenom, adresse, suite_adresse, pays, email, telephone, nom_societe, siret, tva, contact } = req.body;

  console.log('aaaaa');
  try {
    const password = generateStrongPassword(8);
    console.log('pass', password);

    const newClient = new Client({
      type,
      civilite,
      name,
      prenom,
      adresse,
      suite_adresse,
      pays,
      email,
      telephone,
      nom_societe,
      siret,
      tva,
      contact,
      password: password
    });
    console.log('newClient', newClient);

    const newUser = new User({
      nom: name,
      prenom,
      email,
      telephone,
      pays,
      ville: adresse, // Assuming "ville" should be part of "adresse"
      adresse,
      contact,
      type: "client",
    });
    

    try {
      await newUser.save();
      console.log("newUser", newUser);
    } catch (error) {
      console.error('Error saving user:', error);
      return res.status(500).json({ success: false, message: 'Error saving user: ' + error.message });
    }

    const newAccount = new Account({
      user: newUser._id,
      accountIdentifier: email, 
      accountType: "free", 
      password,
      dateInscription: Date.now(),
      statut: 'active',
      parametresDuaccount: {
        notifications: true,
        confidentialite: 'public',
      },
    });
    console.log("newAccount", newAccount);

    try {
      await newAccount.save();
    } catch (error) {
      console.error('Error saving account:', error);
      return res.status(500).json({ success: false, message: 'Error saving account: ' + error.message });
    }

    try {
      await newClient.save();
    } catch (error) {
      console.error('Error saving client:', error);
      return res.status(500).json({ success: false, message: 'Error saving client: ' + error.message });
    }

    const mailOptions = {
      from: 'mahboulirahma0@gmail.com',
      to: newClient.email,
      subject: "Invitation",
      html: `<p>${newClient.password}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.json({ error: "An error occurred while sending the email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ msg: 'The invitation has been sent by email' });
      }
    });

    console.log('clienttt', newClient);
    return res.status(201).json({ newClient });

  } catch (err) {
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

const getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Exemple dans clientController.js
const getClientById = async (req, res) => {
  const clientId = req.params.id; // Assurez-vous que req.params.id est correctement défini

  try {
    const client = await Client.findById(clientId); // Assurez-vous que clientId est un ObjectId valide
    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(client);
  } catch (error) {
    console.error('Erreur lors de la récupération du client :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du client' });
  }
};
const getClientCount = async (req, res) => {
  try {
    const countClient = await Client.countDocuments();
    
    res.json({ count: countClient});
  } catch (error) {
    console.error('Erreur lors du comptage des devis :', error);
    res.status(500).json({ message: 'Erreur lors du comptage des devis' });
  }
};
const deleteClient = async (req, res) => {
  const clientId = req.params.clientId;

  try {
    // Vérifier si le client a des factures associées
    const factures = await Facture.find({ client: clientId });
    if (factures.length > 0) {
      return res.status(400).json({ message: "Le client ne peut pas être supprimé car il a des factures associées." });
    }

    // Vérifier si le client a des devis associés
    const devis = await Devis.find({ client: clientId });
    if (devis.length > 0) {
      return res.status(400).json({ message: "Le client ne peut pas être supprimé car il a des devis associés." });
    }

    // Si aucune facture ni devis associé, supprimer le client
    const deletedClient = await Client.findByIdAndDelete(clientId);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    return res.json({ message: "Client supprimé avec succès" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur lors de la suppression du client" });
  }

};

const getClientByEmail = async (req, res) => {
  const email = req.params.email;
  try {
    const client = await Client.findOne({ email });
    if (!client) {  
      return res.status(404).json({ message: 'Client not found' });
    } 
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

module.exports = { getClientCount,generateStrongPassword, transporter, getAllClient, getClientById, createClient, deleteClient, updateClient , getClientByEmail };
