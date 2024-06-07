const { response } = require('express');
var backup = require('mongodb-backup'); // use require('mongodb-backup') instead
const uri =  'mongodb+srv://salemhellal2:fja35uRnkwRnv3rt@cluster0.ebyqq2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 




function backupHandler(req ,res){

    const { body } = req;
    

    if (!body || !body.collections){
        return res.status(400).json({message: 'Ivalid request data' });
    }

    const { collections } = body.collections;

    let __dirname = process.cwd();
    try {

        backup({
            uri: uri, // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
            root: __dirname, // write files into this dir
            collections: collections, // save this collection only
          });
          res.status(200).json({success : true , massage: "backup seccess "})
        } catch(e){
            return res.status(500).json({message: 'Erreur backup failed ',e})
        }

}


module.exports = {backupHandler}