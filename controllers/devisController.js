const Devis = require('../models/devisModel');

const createdevis = async (req, res) => {
    try {
      
        const {
            idImport,
            dateImport,
            numDoc,
            dateCreation,
            dateEcheance,
            montantHT,
            montantTTC,
            montantTVA,
            remise,
            statut,
            commentaire,
            modePaiement,
            datePaiement,
            adresse,
            source
        } = req.body;

        
        const nouvelledevis = await Devis.create({
            idImport,
            dateImport,
            numDoc,
            dateCreation,
            dateEcheance,
            montantHT,
            montantTTC,
            montantTVA,
            remise,
            statut,
            commentaire,
            modePaiement,
            datePaiement,
            adresse,
            source
        });

       
        res.status(201).json({ success: true, data: nouvelledevis });
    } catch (err) {
     
        res.status(500).json({ success: false, message: 'Erreur lors de la création de la devis', error: err.message });
    }
};



const getAlldevis = async (req,res) => {
    try{
        const deviss = await Devis.find()
        return res.status(200).json(deviss);


    }catch(error){
        return res.status(500).json({ success :false , message: error.message})
    }
};


const getdevisById =async(req,res) => {
    const id =req.params.devisId;
    try{
    const devis = await Devis.findById(id);
    return res.json(devis);
}catch (err) {
    return res.json(err);
}
}

const updatedevis= async(req, res) => {
    const id = req.params.devisId;
    const data = req.body;
    try {
        const updatedevis = await devis.findByIdAndUpdate(id, data, { new: true });
        return res.json(updatedevis);
    } catch (err) {
        return res.json(err);
    }
};

module.exports = {getAlldevis ,getdevisById ,createdevis ,updatedevis}