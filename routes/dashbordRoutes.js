const express = require('express');
const router = express.Router();
const {getDashbordData ,userActivity } = require('../controllers/dashbordController');
const { getData, getUserData } = require('../controllers/dataController');

router.post("/", getDashbordData);
router.get("/", getData);
router.get("/userActivity", userActivity);
router.get("/userdata", getUserData);

module.exports = router; 
