// authRoutes.js
const express = require("express");
const router = express.Router(); 
const { signUp, login, logout,} = require("../controllers/authController"); 

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
//router.post("/sendresetpasswordemail", sendResetPasswordEmail );
//router.post("/resetPassword", resetPassword);

module.exports = router;
