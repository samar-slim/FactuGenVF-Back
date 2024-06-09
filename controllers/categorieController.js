const Categorie = require("../models/categorieModel");



const createcategorie = async(req, res) => {
    const {  Libéllé, categorie_nom } = req.body;
    try {
        console.log(req.body)
        const newCategorie = new Categorie({
            Libéllé,
            categorie_nom
        });
        await newCategorie.save();
        console.log('cat',newCategorie)
        return res.status(201).json({ newCategorie });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

const getAllcategorie = async (req,res) => {
    try{
        const categories = await Categorie.find()
        return res.status(200).json(categories);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};
const getcategorieById = async (req, res) => {
    const id = req.params.categorieId;
    try {
        const categorie = await Categorie.findById(id);
        if (!categorie) {
            return res.status(404).json({ message: "categorie non trouvé" });
        }
        console.log('prod :::', categorie);
        return res.json(categorie);
    } catch (err) { 
        console.error('Erreur lors de la récupération du categorie :', err);
        return res.status(500).json({ message: "Erreur serveur lors de la récupération du categorie" });
    }
};

const deletecategorie = async (req, res) => {
    const id = req.params.categorieId;
    console.log('iddd',id)
    try {
        const deletedcategorie = await Categorie.findByIdAndDelete(id);
        if (!deletedcategorie) {
            return res.status(404).json({ message: 'categorie non trouvé' });
        }
        return res.status(200).json({ message: 'categorie supprimé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression du categorie:', err);
        return res.status(500).json({ message: 'Erreur lors de la suppression du categorie' });
    }
};

const updatecategorie= async(req, res) => {
    const id = req.params.categorieId;
    const data = req.body;
    try {
        const updatecategorie = await Categorie.findByIdAndUpdate(id, data, { new: true });
        return res.json(updatecategorie);
    } catch (err) {
        return res.json(err);
    }
};




module.exports = {getAllcategorie ,getcategorieById ,createcategorie ,deletecategorie,updatecategorie};