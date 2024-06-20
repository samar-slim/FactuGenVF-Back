const { loadTemplate, createTemplate, deleteTemplate, getTemplates } = require('../controllers/templateController');
const express = require('express');
const router = express.Router();

router.get('/', getTemplates);
router.get('/:template', loadTemplate);
router.post('/', createTemplate);
router.delete('/:template', deleteTemplate);

module.exports = router;