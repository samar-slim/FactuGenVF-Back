const Client = require("../models/clientModel");

const getAllClient  = async(req ,res) => {
    try {
        const client = await Client.find()
        return res.status(500).json(client);
    }catch(error){
        return res.status(500).json({success : false , message :error.message})
    }
};
module.exports ={getAllClient};