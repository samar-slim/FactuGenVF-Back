const User = require("../models/userModel");


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
const updateUser= async(req, res) => {
    const id = req.params.userId;
    const data = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
        return res.json(updateUser);
    } catch (err) {
        return res.json(err);
    }
};




module.exports = {getAllUsers ,getUserById ,createUsers ,deleteUser,updateUser};