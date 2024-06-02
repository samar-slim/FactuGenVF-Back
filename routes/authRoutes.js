// authRoutes.js
const express = require("express");
const router = express.Router(); 
const { signUp, login, logout, sendResetPasswordEmail, resetPassword, changePassword} = require("../controllers/authController"); 

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/sendresetpasswordemail", sendResetPasswordEmail );
router.post("/resetPassword", resetPassword);
router.post("/changePassword/:accountId", changePassword);
module.exports = router;
