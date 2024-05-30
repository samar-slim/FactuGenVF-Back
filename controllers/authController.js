const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Account = require('../models/accountModel');
const sendResetPasswordEmailFunction = require('../tools/sendResetPassword')

//signup
async function signUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, account } = req.body;

  const { nom, prenom, email, telephone, pays, ville, adresse, contact, type } = user;
  const { accountIdentifier, typeaccount, password } = account;
  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hash(password, salt);

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
    }
    let existingaccount = await Account.findOne({ accountIdentifier });
    if (existingaccount) {
      return res.status(400).json({ message: 'Il existe un account avec cet identifiant.' });
    }
    const newUser = new User({
      nom,
      prenom,
      email,
      telephone,
      pays,
      ville,
      adresse,
      contact,
      type,
    });

    const newaccount = new Account({
      user: newUser._id,
      accountIdentifier,
      typeaccount,
      password,
      dateInscription: Date.now(),
      statut: 'actif',
      parametresDuaccount: {
        notifications: true,
        confidentialite: 'public',
      },
    });


    try {
      await newaccount.save();
      await newUser.save();
    } catch (error) {
      console.error(error);

      return res.status(500).json({  message: 'Erreur lors de la création du account.' });
    }

    res.status(201).json({ success: true, message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Erreur lors de l\'inscription.' });
  }
}

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let accountIdentifier = email;
    console.log('Identifiant account:', accountIdentifier);

    const account = await Account.findOne({ accountIdentifier });
    console.log('account:', account);

    if (!account) {
      console.log('No account found');
      return res.status(401).json({ error: 'Aucun account avec cet identifiant' });
    }

    //const passwordMatch = await bcrypt.compare(password, account.password);
    
    const passwordMatch = await account.comparePassword(password);
    console.log('Password Match:', passwordMatch);

    if (!passwordMatch) {
      console.log('Incorrect password');
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const oneDayInSeconds = 86400;
    const token = jwt.sign({ accountId: account._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('Token:', token);

    let profile = {
      accountId : account._id,
      accountIdentifier : account.accountIdentifier,
      role: account.accountType,
    }

    res.cookie("app-session-token", token, {
      expire: oneDayInSeconds + Date.now(),
    });

    res.status(200).json({ token, profile });
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(500).json({ error: 'Erreur d\'authentification' });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("app-session-token");
    return res.status(200).json({ successfully: true, message: "User has logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};


  //email reset password
  const sendResetPasswordEmail = async (req, res) => {
    try {
      const userFound = await User.findOne({ email: req.body.email });
  
      if (!userFound)
        return res.status(422).json({
          successful: false,
          message: "Doesn't exits account link with that email",
        });
  
      const id = userFound._id;
  
      const token = jwt.sign(
        {
          id,
          expiration: Date.now() + 10 * 60 * 1000,
        },
        process.env.JWT_RESET_FORGOTTEN_PASSWORD_KEY
      );
  
      const url = `${
        process.env.HOST || "localhost:3000"
      }/#/authentication/resetPassword/${token}`;
  
      await sendResetPasswordEmailFunction(url, req.body.email);
  
      return res.status(200).json({
        success: true,
        message: "Reset password email has been send successfully",
      });
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        successful: false,
        message: "Something went wrong, fail to to send reset password email",
      });
    }
  };

  
  
  //reset password
const resetPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const token = req.params.token;

    console.log("Received reset password request with token:", token);

    if (!token) {
      console.log("No token provided");
      return res.status(403).json({ success: false, message: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
    } catch (error) {
      console.log("Invalid or expired token:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    console.log("Decoded token:", decoded);

    const id = decoded.id;
    console.log("Decoded ID:", id);

    const compteFound = await Account.findById(id);
    console.log("Found Compte:", compteFound);

    if (!compteFound) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword !== confirmPassword) {
      console.log("Passwords don't match");
      return res.status(400).json({ successful: false, message: "Passwords don't match" });
    }

    if (newPassword.length < 5) {
      console.log("Password length less than 5");
      return res.status(400).json({ successful: false, message: "Password must be at least 5 characters long" });
    }

    //const encodedPassword = await compteFound.passw(newPassword, 10);
    compteFound.password = newPassword;

    await compteFound.save();

    console.log("Password updated successfully");
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Failed to update password:", err);
    return res.status(500).json({ successful: false, message: "Failed to update password" });
  }
};

  



module.exports = { signUp, login, logout, sendResetPasswordEmail, resetPassword };