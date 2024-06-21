const User = require('../models/userModel');
const Devis = require('../models/devisModel');
const Factures = require('../models/factureModel');
const Account = require('../models/accountModel');
const HistoriqueActivite = require('../models/historiqueActivityModel');


async function getDashbordData(req, res) {
    let { accountID } = req.body;
    console.log("request body -------", req.body);

    console.log("get admin dashboard data", accountID);

    if (!accountID) {
        return res.status(400).json({ success: false, message: "Missing account ID 0000" });
    }

    try {
        let account = await Account.findById(accountID );
        if (!account) {
            
            
            return res.status(404).json({ success: false, message: "Account not found" });
        }

        let isAdmin = account.accountType === "admin";
        if (!isAdmin) {
            return res.status(401).json({ success: false, message: "User is not admin" });
        }

        let UsersCount = await User.countDocuments();
        let DevisCount = await Devis.countDocuments();
        let FacturesCount = await Factures.countDocuments();
        let ExportationTotal = 0;

        let loginActivities = await HistoriqueActivite.find({ 'cible': '/login' });
        let activityMap = [];

        loginActivities.forEach(activity => {
            let date = new Date(activity.date);
            console.log("date : ", date);
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getDate()).padStart(2, '0');
        
            // Format the date as YYYY-MM-DD
            const dayDate = `${year}-${month}-${day}`;
            console.log("dayDate : ", dayDate);
            

            if (activityMap[dayDate]) {
                console.log("add one to the activity map");
                activityMap[dayDate]++;
            } else {
                console.log("add new one to the activity map");
                activityMap[dayDate] = 1;
            }
        });

        console.log("activityMap : ", activityMap);
        const formatData = Object.entries(activityMap).map(([key, value]) => ({ date: key, count: value }));
        console.log("formatData : ", formatData);   

        let Dashbord = {
            Date: Date.now(),
            Users: UsersCount,
            Devis: DevisCount,
            Factures: FacturesCount,
            Exportation: ExportationTotal,
            HistoriqueActivite: formatData  
        };

        console.log("Dashbord : ", Dashbord);

        res.status(200).json({ Dashbord });
    } catch (e) {
        console.log("error :" + e)
        return res.status(500).json({ success: false, message: e.message });
    }
}

const userActivity = async function(){

    try {

        let loginActivities = await HistoriqueActivite.find({ 'cible': '/login' });
        let activityMap = [];

        loginActivities.forEach(activity => {
            let date = new Date(activity.date);
            console.log("date : ", date);
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getDate()).padStart(2, '0');
        
            // Format the date as YYYY-MM-DD
            const dayDate = `${year}-${month}-${day}`;
            console.log("dayDate : ", dayDate);
            

            if (activityMap[dayDate]) {
                console.log("add one to the activity map");
                activityMap[dayDate]++;
            } else {
                console.log("add new one to the activity map");
                activityMap[dayDate] = 1;
            }
        });

        console.log("activityMap : ", activityMap);
        const formatData = Object.entries(activityMap).map(([key, value]) => ({ date: key, count: value }));
        console.log("formatData : ", formatData);
        
        console.log( " updated userda")
    } catch(err) {
        console.error(err)
    }


}

module.exports = { getDashbordData, userActivity };
