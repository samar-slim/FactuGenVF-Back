const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const config = require('../config/db');

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
            type

         });
         await newUser.save();

         return res.status(201).json(newUser);
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


const getUserById =async(req,res) => {
    const id =req.params.userId;
    try{
    const user = await User.findById(id);
    return res.json(user);
}catch (err) {
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
    const userId = req.params.userId;
    const userData = req.body; // Assuming the request body contains the updated user data

    try {
        // Find the user by ID and update with the new data
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user was successfully updated, return the updated user data
        return res.status(200).json(updatedUser);
    } catch (error) {
        // If an error occurs during the update operation, return an error response
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {getAllUsers ,getUserById ,createUsers ,deleteUser,updateUser};