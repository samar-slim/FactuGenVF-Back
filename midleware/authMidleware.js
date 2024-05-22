// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET; // Load the secret from environment variables


module.exports = function(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('No Authorization header.');
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token found in Authorization header.');
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("jwt verifiade");
    next();
  } catch (ex) {
    console.log('Token verification failed:', ex.message);
    res.status(400).send('Invalid token.');
  }
};
