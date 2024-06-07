const { aiRequest, upload} = require('../controllers/AIController');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const uploadImage = multer({dest: 'upload/'})
router.post('/', aiRequest);
router.post('/upload', uploadImage.single('image'), upload);
module.exports = router