const User = require("../models/userModel");
const mongoose = require('mongoose');
const { userSchema } = require('../models/userModel');


const createUsers = async(req,res) => {
    try{
         const { nom, prenom, email, telephone, pays, ville, adresse, contact, type } = req.body;
         
         if (!nom || !prenom || !email || !telephone || !type) {
            return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
        }
         const newUser = new User({
            nom,
            prenom,
            email,
            telephone,
            pays,
            ville,
            adresse,
            contact,
            type,
            nomEntreprise: "",
            emailEntreprise:  "",
            telEntreprise:  "",
            adrEntreprise:  "",
            paysEntreprise: "",
            siretEntreprise:  "",
            tvaEntreprise:  "", 

         });
         await newUser.save().then(() => {
             console.log("user created", newUser);
             return res.status(201).json(newUser);
         }).catch((err) => {
             return res.status(500).json({ success: false, message: err.message });
         });

         
    }
    catch(err){
        return res.status(500).json({ success: false, message: err.message });
    }
};


const getAllUsers = async (req,res) => {
    try{
        const users = await User.find()
        return res.status(200).json(users);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};

const getUserById = async (req, res) => {
    const id = req.params.userId;
    try {
      const user = await User.findById(id);
      return res.json(user);
    } catch (err) {
      return res.json(err);
    }
  };
  
const deleteUser = async(req,res) => {
    const id = req.params.userId ;
    try{
        const  deleteUser = await User.findByIdAndDelete(id);
        return res.json(deleteUser);
    }catch(err){
        return res.json(err)
    }
};
const updateUser = async (req, res) => {
    const id = req.params.userId;
    const data = req.body;
  
    try {
      // Validate userId (optional but recommended)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      // Validate the update data (optional but recommended)
      // You can add more specific validation for your fields
      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
      }
  
      // Log the schema (optional)
      console.log('User schema:', User.schema.obj);
  
      // Update user
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
  
      if (!updateUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      console.log("User updated:", updateUser);
      return res.status(200).json(updateUser);
    } catch (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  




module.exports = {getAllUsers ,getUserById ,createUsers ,deleteUser,updateUser};