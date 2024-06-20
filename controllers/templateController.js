const fs = require('fs');
const path = require('path');
const  Template = require('../models/templateModel');


const loadTemplate = async (req, res) => {
    try {
        
    
        const templateName = req.params.template;
        console.log("template :--:",templateName);
        const template = await Template.findOne({ name: templateName });

        if (!template) {
            console.log("template not found");
            return res.status(404).send('Template not found');
        }   

        res.status(200).json(template);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Internal server error ${error}` });
    }
};

const createTemplate = async (req, res) => {
    try {

        const { name, FileName, url, textColor, headerColor, bodyColor } = req.body;
        console.log("template ::",name, url, textColor, headerColor, bodyColor);
        const newTemplate = new Template({
            name,
            FileName,
            imageUrl: url || null,
            textColor,
            headerColor,
            bodyColor,
        });
        const savedTemplate = await newTemplate.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error}` });
    }
    
    
  };

const deleteTemplate = (req, res) => {
    const id = req.params.templateId;
    template.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Template with id=${id}. Maybe Template was not found!`
            });
        } else {
            res.send({
                message: "Template was deleted successfully!"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ error: `Error deleting Template ${err}` });
    });
}

// function to get the list of templates
const getTemplates = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ error: `Internal server error ${error}` });
    }
};

module.exports = { loadTemplate , createTemplate , deleteTemplate, getTemplates };