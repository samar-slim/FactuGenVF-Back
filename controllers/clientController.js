
const Client = require("../models/clientModel");
const Facture = require("../models/factureModel");


const createClient = async(req,res) => {
    const {  type, civilite,name, prenom,adresse,suite_adresse,pays,email, téléphone,nom_societe,siret, tva,contact } = req.body;
    try{
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
            contact
         });
        
         
         await newClient.save();

         return res.status(201).json({newClient});
    }
    catch(err){
        return res.status(500).json({ success: false, message: err.message });
    }
};


const getAllClient = async (req,res) => {
    try{
        const Clients = await Client.find()
        return res.status(200).json(Clients);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};
const getClientById = async (req, res) => {
    const id = req.params.ClientId;
    console.log('Client ID:', id);
   
    try {
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        
        return res.json(client);
    } catch (err) { 
        console.error('Erreur lors de la récupération du client :', err);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du client" });
    }
};

const deleteClient = async(req,res) => {
    const id = req.params.clientId ;

    const foundFactures = Facture.findOne({ clientId : id });
    if(foundFactures) {
        return res.status(400).json({message : 'cette client a des factures, vous ne pouvez pas le supprimer'})
    }


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



module.exports = {getAllClient ,getClientById ,createClient ,deleteClient,updateClient};