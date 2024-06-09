// Importez Multer
const multer = require("multer");
const path = require("path");

// Configurez le stockage des fichiers avec Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Déterminez le dossier de destination en fonction de la route
      let folder = 'uploads/';
      if (req.baseUrl.includes('devis')) {
        folder += 'devis/';
      } else if (req.baseUrl.includes('produits')) {
        folder += 'produits/';
      }
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      // Générez un nom de fichier unique avec un horodatage
      cb(null, Date.now() + path.extname(file.originalname));
    }
});





























// Initialisez Multer avec la configuration de stockage
const upload = multer({ storage: storage });

// Exportez l'objet de téléchargement Multer configuré pour une utilisation dans d'autres parties de votre application
module.exports = upload;
