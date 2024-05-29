const sendEmail = require("./mailSender");

const sendConfirmationEmail = async (url, email) => {
  try {
    const emailOptions = {
      from: `"FactuGen " <${process.env.SENDER_EMAIL}> `,
      to: email,
      subject: "Confirmation E-mail",
      html: `
    <div style= "max-width:600px; margin: 0 auto;">
      <h1 style="text-align: center;
    color: #5f6368;
        padding-bottom: 20px;
   ">Bienvenue!</h1>


    <p style="
        margin: 0;
        font-size: 16px;
        ">
        Nous sommes heureux de vous accueillir. Il ne reste plus qu'une étape avant de pouvoir utiliser l'application. Appuyez simplement sur le bouton ci-dessous et votre compte sera vérifié automatiquement.


        </p>
     <div  style="width: fit-content;
margin: 40px auto;
    " ><a href="${url}" target="_blank" style=" font-size: 16px;
    font-family: Helvetica,Arial,sans-serif;
    color: #222;
    cursor:pointer;
    text-decoration: none;
    padding: 10px 20px;
  border: 2px solid #202124;
    background: #fcba1c;
    font-weight: 600;
    display: inline-block;">CONFIRMER COMPTE</a></div>

           <p style="  margin-bottom:0;   font-size: 16px;">Si cela ne fonctionne pas, veuillez copier et coller le lien suivant dans votre navigateur : </p>

      <p style="text-align:center; margin:10px 0;  font-size: 16px;"><a href="#" target="_blank" style="color: #FFA73B;">${url}</a></p>

  <p style="  font-size: 16px;">Si vous avez des questions, envoyez-les à cette adresse email, nous serons heureux de vous aider.</p>
  <div>
      <p style="    font-size: 16px;
    padding: 30px 0;
    background: #ffd5a1;
        color: #5f6368;
    text-align: center;">Salutations de l'équipe FactuGen</p>
`,
    };

    await sendEmail(emailOptions);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendConfirmationEmail;
