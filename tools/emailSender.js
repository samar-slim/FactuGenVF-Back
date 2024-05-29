const nodemailer = require('nodemailer');
require('dotenv').config({path: '.env'});
const { google } = require("googleapis");


const {
  OAUTH_USER,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDERICT_URI,
  SENDER_EMAIL,
  SENDER_PASSWORD

} =   process.env



async function createTransporter(){



  try{




   const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587, // Outlook SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
      user: SENDER_EMAIL, // Your Outlook email address
      pass: SENDER_PASSWORD // Your Outlook email password
    }
  
  });

transporter.verify( (err, success) => {
  if(err){
    
console.log("Verification error"+err)
return
  }
 console.log(`=== Server is ready to take messages: ${success} ===`);
});
  

return transporter



  }catch(err){
  console.log('------------------------------------------------')
  console.log(OAUTH_USER,
    OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET,
    OAUTH_REFRESH_TOKEN,
    OAUTH_REDERICT_URI)
  console.log('------------------------------------------------')
  console.log(err)

  }

}

const sendEmail = async (emailOptions) => {
try{

  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);

}catch(err){
  console.log(err)

}

};


 

  module.exports = sendEmail