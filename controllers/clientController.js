const Client = require("../models/clientModel");



const createClient = async(req,res) => {
    try{
         const { nom, prenom, email, telephone, pays, ville, adresse, contact } = req.body;
         
         if (!nom || !prenom || !email || !telephone ) {
            return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
        }
         const newClient = new Client({
            nom,
            prenom,
            email,
            telephone,
            pays,
            ville,
            adresse,
            contact

         });
         await newClient.save();

         return res.status(201).json(newClient);
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


const getClientById =async(req,res) => {
    const id =req.params.clientId;
    try{
    const client = await Client.findById(id);
    return res.json(client);
}catch (err) {
    return res.json(err);
}
};
const deleteClient = async(req,res) => {
    const id = req.params.clientId ;
    try{
        const  deleteclient = await Client.findByIdAndDelete(id);
        return res.json(deleteUser);
    }catch(err){
        return res.json(err)
    }
};
const updateClient= async(req, res) => {
    const id = req.params.clientId;
    const data = req.body;
    try {
        const updateClient = await User.findByIdAndUpdate(id, data, { new: true });
        return res.json(updateClient);
    } catch (err) {
        return res.json(err);
    }
};




module.exports = {getAllClient ,getClientById ,createClient ,deleteClient,updateClient};