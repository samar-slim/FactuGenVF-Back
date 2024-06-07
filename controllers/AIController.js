const dotenv = require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Tesseract = require('tesseract.js');
const { pdfToPng } = require('pdf-to-png-converter');
const path = require('path');
const Documents = require('../models/documentModel');
const fs = require('fs');

const G_api = process.env.gemini_api;

const genAI = new GoogleGenerativeAI(G_api);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateText(prompt) {
    try {
        const result = await model.generateContent(prompt);
        console.log("-------------------");
        console.log('Result:', result);
        console.log("-------------------");

        if (!result || !result.response || !result.response.text) {
            throw new Error("Invalid response format");
        }

        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error in generateText:", error);
        throw error;
    }
}

// Function to handle AI request using generative AI
async function aiRequest(req, res) {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);
    try {
        const response = await generateText(prompt);
        console.log("Generated response:", response);
        res.status(200).json({ text: response });
    } catch (error) {
        console.error("Error in aiRequest:", error);
        res.status(500).json({ error: "An error occurred while generating the text" });
    }
}


async function upload(req, res) {
    try {

        

        
        
        if (!req.file) {
            console.log("error: no file uploaded");
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // check if the file format pdf or png or jpg 
        if (req.file.mimetype !== 'application/pdf' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
            console.log("error: invalid file format");
            return res.status(400).json({ error: 'Invalid file format' });
        }
        const { path: pdfPath } = req.file;
        console.log(req.file.mimetype);
      

        if (req.file.mimetype === 'application/pdf'){
            console.log(`File uploaded to: ${pdfPath}`);

            // Convert PDF to PNG images
            const images = await pdfToPng(pdfPath, {
                viewportScale: 2.0,
            });

            // Save the first image to a temporary file
            const pngImagePath = path.join(__dirname, 'uploads');
            fs.writeFileSync(pngImagePath, images[0].content);
        

            // Perform OCR on the PNG image using Tesseract.js
                const { data }  = await Tesseract.recognize(
                pngImagePath,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            // Handle progress update if needed
                        }
                    }
                }
            );

            // Delete the uploaded PDF file after processing
            fs.unlinkSync(pdfPath);

            // Delete the temporary PNG image file
            fs.unlinkSync(pngImagePath);
            
            
            let promp = 'take this text as input \
            ${data.text}\
            create an object in this format: \
            '
            // Send the OCR text back to the client
            res.json({ text: data.text });



    } else {
        // Perform OCR on the uploaded jpg/png file using Tesseract.js
        let { data }   = await Tesseract.recognize(
            pdfPath,
            'eng',
            {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        // Handle progress update if needed
                    }
                }
            }
        );
        // Delete the uploaded png/jpg file after processing
        fs.unlinkSync(pdfPath);

        //let json = Documents.schema.tree;
        //console.log("Document schema:", json);

        let prompt = ` \
        ${data.text} \
        give json for a invoice uinst the data and his fromat: \
        documents = new Schema({idImport: { type: String, required: true },    dateImport: { type: Date, required: true },    numDoc: { type: String, required: true },     dateCreation: { type: Date, required: true },     dateEcheance: { type: Date, required: false },    montantHT: { type: Number, required: true },    montantTTC: { type: Number, required: true },     montantTVA: { type: Number, required: false },    remise: { type: Number, required: false },     statut: { type: String, required: true, enum: [en_cours, validé, payé, confirmé] },     commentaire: { type: String, required: false },    modePaiement: { type: String, required: false },    datePaiement: { type: Date, required: false },    adresse: { type: String, required: false },     source: { type: String, required: false },}); \
        retrun only the object  `; 
        console.log('===================================')
        console.log("prompt:", prompt);
        console.log('===================================')

        const AIObeject = await generateText(prompt);
        console.log("++++++++++++++++++++++++++++++")
        console.log("AIObeject:", AIObeject);
        let AIjson = extractJSON(AIObeject);
        console.log("++++++++++++++++++++++++++++++")
        console.log('AIjson :' , AIjson[0]);
        let document = new Documents(AIjson[0]);

        document.save();
        console.log("++++++++++++++++++++++++++++++")
        console.log('document created ')
        // Send the OCR text back to the client
        res.status(200).json({ text: data.text });   
    }


    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
}


async function convertPDFToPNG(pdfPath, outputPath) {
    try {
      // Convert PDF to PNG images
      const images = await pdfToPng(pdfPath, {
            viewportScale: 2.0,
      });
  
      // Save the first image to file
      const imageBase64 = images; // Use images[0] if outputType is 'base64'
      const imageData = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, imageData);
  
      console.log('PDF converted to PNG:', outputPath);
    } catch (error) {
      console.error('Error converting PDF to PNG:', error);
      throw error;
    }
  }


  function extractJSON(str) {
    var firstOpen, firstClose, candidate;
    firstOpen = str.indexOf('{', firstOpen + 1);
    do {
        firstClose = str.lastIndexOf('}');
        console.log('firstOpen: ' + firstOpen, 'firstClose: ' + firstClose);
        if(firstClose <= firstOpen) {
            return null;
        }
        do {
            candidate = str.substring(firstOpen, firstClose + 1);
            console.log('candidate: ' + candidate);
            try {
                var res = JSON.parse(candidate);
                console.log('...found');
                return [res, firstOpen, firstClose + 1];
            }
            catch(e) {
                console.log('...failed' , e);
            }
            firstClose = str.substr(0, firstClose).lastIndexOf('}');
        } while(firstClose > firstOpen);
        firstOpen = str.indexOf('{', firstOpen + 1);
    } while(firstOpen != -1);
}

  
//give me example curl request to test the upload file function 
// curl -X POST -F "image=@image.png" http://localhost:8080/upload


// Example of a curl request to test this function
// curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Give me an example of a curl request to test this function"}' http://localhost:8080/aiRequest       

module.exports = { aiRequest , upload};
