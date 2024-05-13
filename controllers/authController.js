const { validationResult } = require('express-validator');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Account = require('../models/accountModel');

// Signup
async function signUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { user, account } = req.body;

  const { nom, prenom, email, telephone, pays, ville, adresse, contact, type } = user;
  const { accountIdentifier, accountType, password } = account;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This user already exists.' });
    }

    let existingAccount = await Account.findOne({ accountIdentifier });
    if (existingAccount) {
      return res.status(400).json({ message: 'An account with this identifier already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const newAccount = new Account({
      user: newUser._id,
      accountIdentifier,
      accountType,
      password: hashedPassword,
      registrationDate: Date.now(),
      status: 'active',
      accountSettings: {
        notifications: true,
        privacy: 'public',
      },
    });

    await newAccount.save();
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error during registration.' });
  }
}

// Login
const login = async (req, res) => {
  try {
    const { accountIdentifier, password } = req.body;

    const account = await Account.findOne({ accountIdentifier });
    if (!account) {
      return res.status(401).json({ error: 'No account found with this identifier' });
    }

    
    bcrypt.hash('mypassword', 10, function(err, hash) {
        if (err) { throw (err); }
    
        bcrypt.compare('mypassword', hash, function(err, result) {
            if (err) { return res.status(401).json({ error: 'Incorrect password' }); }
            console.log(result);
        });
    });
   
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ accountId: account._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log("testtest")
    res.cookie("app-session-token", token, { expire: Date.now() + 86400 });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(500).json({ error: 'Authentication error' });
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

module.exports = { signUp, login, logout };