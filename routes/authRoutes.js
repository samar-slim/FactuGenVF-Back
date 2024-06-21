// authRoutes.js
const express = require("express");
const router = express.Router(); 
const { signUp, login, logout, sendResetPasswordEmail, resetPassword, changePassword, verifyToken} = require("../controllers/authController"); 

router.post("/", verifyToken)
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/sendresetpasswordemail", sendResetPasswordEmail );
router.post("/resetPassword/:token", resetPassword);
router.post("/changePassword/:accountId", changePassword);
module.exports = router;
