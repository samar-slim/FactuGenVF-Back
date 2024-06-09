const Produit = require("../models/produitModel");



const createproduit = async(req,res) => {
    try{
         const { nom, description, prix, image, service} = req.body;
         
         if (!nom || !description || !prix || !image ) {
            return res.status(400).json({ success: false, message: "Tous les champs sont requis" });
        }
         const newProduit = new Produit({
            nom,
           description,
            prix,
           image,
           icone,
            service

         });
         await newProduit.save();

         return res.status(201).json(newProduit);
    }
    catch(err){
        return res.status(500).json({ success: false, message: err.message });
    }
};


const getAllproduit = async (req,res) => {
    try{
        const produits = await Produit.find()
        return res.status(200).json(produits);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};


const getproduitById =async(req,res) => {
    const id =req.params.produitId;
    try{
    const produit = await produit.findById(id);
    return res.json(produit);
}catch (err) {
    return res.json(err);
}
};
const deleteproduit = async(req,res) => {
    const id = req.params.produitId ;
    try{
        const  deleteproduit = await produit.findByIdAndDelete(id);
        return res.json(deleteUser);
    }catch(err){
        return res.json(err)
    }
};
const updateproduit= async(req, res) => {
    const id = req.params.produitId;
    const data = req.body;
    try {
        const updateproduit = await User.findByIdAndUpdate(id, data, { new: true });
        return res.json(updateproduit);
    } catch (err) {
        return res.json(err);
    }
};




module.exports = {getAllproduit ,getproduitById ,createproduit ,deleteproduit,updateproduit};