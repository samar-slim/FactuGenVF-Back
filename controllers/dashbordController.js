const User = require('../models/userModel');
const Devis = require('../models/devisModel');
const Factures = require('../models/factureModel');
const Account = require('../models/accountModel');


async function getDashbordData(req, res){

    let {accountID } = req.body;
    console.log("request body", req.body);
    console.log("get admin dashbord data", accountID);
    if (!accountID){

        return res.status(400).json({ success: false, message: "missing account ID ", accountID});
    }
    try {
        let accountIdentifier = accountID;
        let account = await Account.findOne({accountIdentifier});
        let isAdmin = account.accountType === "admin";
        if (!isAdmin){
            return res.status(401).json({error:"User is not admin"});
        }

        let UsersCount = await User.countDocuments();
        let DevisCount = await Devis.countDocuments();
        let FacturesCount = await Factures.countDocuments();
        let ExportationTotal = 0;
        
        let Dashbord = {
            Users: UsersCount,
            Devis: DevisCount,
            Factures: FacturesCount,
            Exportation: ExportationTotal, 
        }


        res.status(200).json({Dashbord});
    } catch(e){
        return res.status(500).json({ success: false, message: e.message})
    }
}

module.exports = {getDashbordData}