const Devis = require('../models/devisModel');

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newImage = new Image({
      fileName: req.file.filename,
     
    });

    const savedImage = await newImage.save();

    res.status(200).json(savedImage);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  uploadImage
};
