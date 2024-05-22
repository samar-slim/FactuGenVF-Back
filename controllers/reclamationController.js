const Reclamation = require('../models/reclamationModel');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const createReclamation = async(req,res) => {
    try{
         const { title, message } = req.body;
         const token = req.headers.authorization.split(' ')[1];

         const rawPayload = atob(token);
        const user = JSON.parse(rawPayload);
        console.log(user.username);
         if (!title || !message) {
            return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
        }
         const newReclamation = new reclamation({
            user: User._id,
            title : title,
            message: message

         });
         await newReclamation.save();

         return res.status(201).json(newReclamation);
    }
    catch(err){
        return res.status(500).json({ success: false, message: err.message });
    }
};


const getAllReclamation = async (req,res) => {
    try{
        const Reclamations = await Reclamation.find()
        return res.status(200).json(Reclamations);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};


const getReclamationById =async(req,res) => {
    const id =req.params.ReclamationId;
    try{
    const Reclamation = await Reclamation.findById(id);
    return res.json(Reclamation);
}catch (err) {
    return res.json(err);
}
};
const deleteReclamation = async(req,res) => {
    const id = req.params.ReclamationId ;
    try{
        const  deleteReclamation = await Reclamation.findByIdAndDelete(id);
        return res.json(deleteReclamation);
    }catch(err){
        return res.json(err)
    }
};
const updateReclamation= async(req, res) => {
    const id = req.params.ReclamationId;
    const data = req.body;
    try {
        const updateReclamation = await Reclamation.findByIdAndUpdate(id, data, { new: true });
        return res.json(updateReclamation);
    } catch (err) {
        return res.json(err);
    }
};




module.exports = {getAllReclamation ,getReclamationById ,createReclamation ,deleteReclamation,updateReclamation};