const { activateAccount, deactivateAccount, deleteAccount } = require("../controllers/accountController");

const express = require('express');
const router = express.Router();    


router.post("/activate", activateAccount);
router.post("/deactivate", deactivateAccount);
router.post("/delete", deleteAccount);  


module.exports = router;
